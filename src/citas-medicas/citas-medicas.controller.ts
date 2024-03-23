import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CitasMedicasService } from './citas-medicas.service';
import { CreateCitasMedicaDto } from './dto/create-citas-medica.dto';
import { UpdateCitasMedicaDto } from './dto/update-citas-medica.dto';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enums/role.enum';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';

@Auth(Role.USER)
@Controller('citas-medicas')
export class CitasMedicasController {
  constructor(private readonly citasMedicasService: CitasMedicasService) {}

  @Post()
  create(
    @Body() createCitasMedicaDto: CreateCitasMedicaDto,
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.citasMedicasService.create(createCitasMedicaDto, user);
  }

  @Get()
  findAll(
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.citasMedicasService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.citasMedicasService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateCitasMedicaDto: UpdateCitasMedicaDto,
  ) {
    return this.citasMedicasService.update(id, updateCitasMedicaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.citasMedicasService.remove(id);
  }
}
