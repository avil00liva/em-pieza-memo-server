import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCitasMedicaDto } from './dto/create-citas-medica.dto';
import { UpdateCitasMedicaDto } from './dto/update-citas-medica.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CitasMedica } from './entities/citas-medica.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class CitasMedicasService {
  constructor(
    @InjectRepository(CitasMedica)
    private readonly citasMed: Repository<CitasMedica>,
  ) {}
  async create(
    createCitasMedicaDto: CreateCitasMedicaDto,
    user: ActiveUserInterface,
  ) {
    return await this.citasMed.save({
      ...createCitasMedicaDto,
      userEmail: user.email,
    });
  }

  async findAll(user: ActiveUserInterface) {
    if (user.role === Role.ADMIN) {
      return await this.citasMed.find();
    }

    return await this.citasMed.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const cita = await this.citasMed.findOneBy({ id });

    if (!cita) {
      throw new BadRequestException('Cita médica no encontrada');
    }

    this.validateOwnership(cita, user);

    return cita;
  }

  async update(id: number, updateCitasMedicaDto: UpdateCitasMedicaDto) {
    return await this.citasMed.update(id, updateCitasMedicaDto);
  }

  async remove(id: number) {
    return await this.citasMed.softDelete({ id });
  }

  private validateOwnership(cita: CitasMedica, user: ActiveUserInterface) {
    if (user.role !== Role.ADMIN && cita.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
