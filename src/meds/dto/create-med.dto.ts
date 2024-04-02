import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateMedDto {
  @IsString()
  med_name: string;

  @IsString()
  @IsOptional()
  med_type: string;

  @IsString()
  @IsOptional()
  amount: string;

  @IsDateString()
  med_start: Date;
}
