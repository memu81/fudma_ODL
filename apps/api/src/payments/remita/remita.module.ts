import { Module } from "@nestjs/common";
import { RemitaController } from "./remita.controller";
import { RemitaService } from "./remita.service";

@Module({
  controllers: [RemitaController],
  providers: [RemitaService],
})
export class RemitaModule {}
