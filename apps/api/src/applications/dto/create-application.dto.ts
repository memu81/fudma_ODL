import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsNotEmpty()
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @Length(11, 15)
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty()
  programId!: string;

  @IsString()
  @IsNotEmpty()
  session!: string;
}
