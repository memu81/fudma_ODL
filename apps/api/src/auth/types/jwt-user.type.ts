import { UserRole } from "../../common/user-role.enum";

export type JwtUser = {
  sub: string;
  email: string;
  role: UserRole;
};
