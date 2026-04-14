import { Injectable, Logger } from '@nestjs/common';
import { CreateRemitaPaymentRequestDto } from './remita.dto';

@Injectable()
export class RemitaService {
  private readonly logger = new Logger(RemitaService.name);

  initiate(payload: CreateRemitaPaymentRequestDto) {
    const rrr = `RRR-${Date.now()}`;
    this.logger.log(`Created mock Remita payment for ${payload.applicationId}`);

    return {
      channel: 'REMITA',
      status: 'PENDING',
      rrr,
      amount: payload.amount,
      paymentUrl: `https://remita.example/checkout/${rrr}`,
      expiresAt: new Date(Date.now() + 1000 * 60 * 30).toISOString(),
    };
  }

  verify(rrr: string) {
    this.logger.log(`Verifying Remita payment ${rrr}`);
    return {
      channel: 'REMITA',
      rrr,
      status: 'SUCCESS',
      paidAt: new Date().toISOString(),
      providerRef: `REM-${Math.floor(Math.random() * 1000000)}`,
    };
  }

  handleWebhook(payload: Record<string, unknown>) {
    this.logger.log('Received Remita webhook payload');
    return {
      accepted: true,
      payload,
    };
  }
}
