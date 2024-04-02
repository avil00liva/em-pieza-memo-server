import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateMedDto } from './dto/create-med.dto';
import { UpdateMedDto } from './dto/update-med.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Med } from './entities/med.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class MedsService {
  constructor(
    @InjectRepository(Med)
    private readonly med: Repository<Med>,
  ) {}

  async create(createMedDto: CreateMedDto, user: ActiveUserInterface) {
    return await this.med.save({
      ...createMedDto,
      userEmail: user.email,
    });
  }

  async findAll(user: ActiveUserInterface) {
    if (user.role === Role.ADMIN) {
      return await this.med.find();
    }

    return await this.med.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: number, user: ActiveUserInterface) {
    const medicamento = await this.med.findOneBy({ id });

    if (!medicamento) {
      throw new BadRequestException('Cita médica no encontrada');
    }

    this.validateOwnership(medicamento, user);

    return medicamento;
  }

  async update(id: number, updateMedDto: UpdateMedDto) {
    return await this.med.update(id, updateMedDto);
  }

  async remove(id: number) {
    return await this.med.softDelete({ id });
  }

  private validateOwnership(med: Med, user: ActiveUserInterface) {
    if (user.role !== Role.ADMIN && med.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
