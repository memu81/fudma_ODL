import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class InitiateRemitaPaymentDto {
  @IsString()
  @IsNotEmpty()
  applicationId!: string;

  @IsNumber()
  @Min(1)
  amount!: number;

  @IsString()
  @IsOptional()
  payerName?: string;

  @IsEmail()
  payerEmail!: string;
}

export class RemitaWebhookDto {
  @IsString()
  @IsNotEmpty()
  event!: string;

  @IsString()
  @IsNotEmpty()
  rrr!: string;
}
