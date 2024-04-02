import { PartialType } from '@nestjs/mapped-types';
import { CreateMedDto } from './create-med.dto';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class UpdateMedDto extends PartialType(CreateMedDto) {
  @IsString()
  @IsOptional()
  med_name: string;

  @IsString()
  @IsOptional()
  med_type: string;

  @IsString()
  @IsOptional()
  amount: string;

  @IsDateString()
  @IsOptional()
  med_start: Date;
}
