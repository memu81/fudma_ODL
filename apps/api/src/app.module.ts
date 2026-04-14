import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ProgramsModule } from "./programs/programs.module";
import { ApplicationsModule } from "./applications/applications.module";
import { RemitaModule } from "./payments/remita/remita.module";

@Module({
  imports: [AuthModule, ProgramsModule, ApplicationsModule, RemitaModule],
})
export class AppModule {}
