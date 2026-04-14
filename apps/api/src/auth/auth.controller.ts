import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from "./dto/register.dto";
import { Public } from './decorators/public.decorator';
import { AccessTokenGuard } from './guards/access-token.guard';
import type { JwtUser } from "./types/jwt-user.type";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post("login")
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get("profile")
  @UseGuards(AccessTokenGuard)
  profile(@Req() req: Request) {
    return req.user as JwtUser;
  }
}
