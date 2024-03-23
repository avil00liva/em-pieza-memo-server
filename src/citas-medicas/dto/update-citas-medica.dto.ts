import { PartialType } from '@nestjs/mapped-types';
import { CreateCitasMedicaDto } from './create-citas-medica.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateCitasMedicaDto extends PartialType(CreateCitasMedicaDto) {
  @IsString()
  @IsOptional()
  establecimiento: string;

  @IsString()
  @IsOptional()
  cita: string;

  @IsDateString()
  @IsOptional()
  date: Date;

  @IsString()
  @IsOptional()
  memo: string;
}
