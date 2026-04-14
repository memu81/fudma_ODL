import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from "../../auth/decorators/roles.decorator";
import { AccessTokenGuard } from "../../auth/guards/access-token.guard";
import { RolesGuard } from "../../auth/guards/roles.guard";
import { UserRole } from "../../common/user-role.enum";
import { InitiateRemitaPaymentDto, RemitaWebhookDto } from "./remita.dto";
import { RemitaService } from "./remita.service";
import { Public } from "../../auth/decorators/public.decorator";

@Controller("payments/remita")
export class RemitaController {
  constructor(private readonly remitaService: RemitaService) {}

  @Post("initiate")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.APPLICANT, UserRole.STUDENT, UserRole.FINANCE)
  initiatePayment(@Body() dto: InitiateRemitaPaymentDto) {
    return this.remitaService.initiate(dto);
  }

  @Get("verify/:rrr")
  @UseGuards(AccessTokenGuard, RolesGuard)
  @Roles(UserRole.APPLICANT, UserRole.STUDENT, UserRole.ADMIN, UserRole.FINANCE)
  verify(@Param("rrr") rrr: string) {
    return this.remitaService.verify(rrr);
  }

  @Post("webhook")
  @Public()
  handleWebhook(@Body() payload: RemitaWebhookDto) {
    return this.remitaService.handleWebhook(payload);
  }
}
