import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { UserRole } from "../common/user-role.enum";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

type InMemoryUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordHash: string;
  role: UserRole;
};

@Injectable()
export class AuthService {
  private readonly users: InMemoryUser[] = [
    {
      id: "seed-applicant-1",
      firstName: "Seed",
      lastName: "Applicant",
      email: "applicant@fudma.edu.ng",
      phoneNumber: "+2348012345678",
      passwordHash: bcrypt.hashSync("Password123!", 10),
      role: UserRole.APPLICANT,
    },
    {
      id: "seed-admin-1",
      firstName: "Seed",
      lastName: "Admin",
      email: "admin@fudma.edu.ng",
      phoneNumber: "+2348098765432",
      passwordHash: bcrypt.hashSync("Password123!", 10),
      role: UserRole.ADMIN,
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async register(input: RegisterDto) {
    const email = input.email.toLowerCase();
    const exists = this.users.some((user) => user.email === email);
    if (exists) {
      throw new ConflictException("A user with this email already exists.");
    }

    const passwordHash = await bcrypt.hash(input.password, 10);
    const user: InMemoryUser = {
      id: `usr_${Date.now()}`,
      firstName: input.firstName,
      lastName: input.lastName,
      email,
      phoneNumber: input.phoneNumber,
      passwordHash,
      role: UserRole.APPLICANT,
    };

    this.users.push(user);
    return this.issueTokens(user);
  }

  async login(input: LoginDto) {
    const user = this.users.find((candidate) => candidate.email === input.email.toLowerCase());
    if (!user) {
      throw new UnauthorizedException("Invalid login credentials.");
    }

    const isValidPassword = await bcrypt.compare(input.password, user.passwordHash);
    if (!isValidPassword) {
      throw new UnauthorizedException("Invalid login credentials.");
    }

    return this.issueTokens(user);
  }

  private issueTokens(user: InMemoryUser) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: "30m" }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: "7d" }),
      user: {
        id: user.id,
        fullName: `${user.firstName} ${user.lastName}`,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      },
    };
  }
}
