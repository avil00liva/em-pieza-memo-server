import { Module } from '@nestjs/common';
import { CitasMedicasService } from './citas-medicas.service';
import { CitasMedicasController } from './citas-medicas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasMedica } from './entities/citas-medica.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CitasMedica])],
  controllers: [CitasMedicasController],
  providers: [CitasMedicasService],
})
export class CitasMedicasModule {}
