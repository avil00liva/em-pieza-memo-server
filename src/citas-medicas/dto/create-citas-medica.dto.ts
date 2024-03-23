import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateCitasMedicaDto {
  @IsString()
  establecimiento: string;

  @IsString()
  cita: string;

  @IsDateString()
  date: Date;

  @IsString()
  @IsOptional()
  memo: string;
}
