import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import type { Request } from "express";
import { Roles } from "../auth/decorators/roles.decorator";
import { AccessTokenGuard } from "../auth/guards/access-token.guard";
import { RolesGuard } from "../auth/guards/roles.guard";
import { UserRole } from "../common/user-role.enum";
import { CreateApplicationDto } from "./dto/create-application.dto";
import { ApplicationsService } from "./applications.service";

@Controller("applications")
@UseGuards(AccessTokenGuard, RolesGuard)
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Post("draft")
  @Roles(UserRole.APPLICANT)
  saveDraft(@Req() req: Request, @Body() dto: CreateApplicationDto) {
    const user = req.user as { sub: string; role: UserRole };
    return this.applicationsService.saveDraft(user.sub, dto);
  }

  @Patch(":id/submit")
  @Roles(UserRole.APPLICANT)
  submit(@Req() req: Request, @Param('id') id: string) {
    const user = req.user as { sub: string };
    return this.applicationsService.submit(user.sub, id);
  }

  @Get("mine")
  @Roles(UserRole.APPLICANT)
  listMine(@Req() req: Request) {
    const user = req.user as { sub: string };
    return this.applicationsService.findByUser(user.sub);
  }

  @Get("admin")
  @Roles(UserRole.ADMIN, UserRole.STAFF)
  listForReview() {
    return this.applicationsService.findForReview();
  }

  @Get(":applicationNumber")
  @Roles(UserRole.APPLICANT, UserRole.ADMIN, UserRole.STAFF)
  getOne(@Req() req: Request, @Param("applicationNumber") applicationNumber: string) {
    const user = req.user as { sub: string; role: UserRole };
    return this.applicationsService.getOneByNumber(
      user.sub,
      user.role,
      applicationNumber,
    );
  }
}
