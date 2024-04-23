import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedsService } from './meds.service';
import { CreateMedDto } from './dto/create-med.dto';
import { UpdateMedDto } from './dto/update-med.dto';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { ActiveUserInterface } from 'src/common/interfaces/active-user.interface';
import {
  ApiBearerAuth,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Medicamentos')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
  description: 'Unauthorized Bearer Auth',
})
@Auth(Role.USER)
@Controller('meds')
export class MedsController {
  constructor(private readonly medsService: MedsService) {}

  @Post()
  create(
    @Body() createMedDto: CreateMedDto,
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.medsService.create(createMedDto, user);
  }

  @Get()
  findAll(
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.medsService.findAll(user);
  }

  @Get(':id')
  findOne(
    @Param('id') id: number,
    @ActiveUser()
    user: ActiveUserInterface,
  ) {
    return this.medsService.findOne(id, user);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateMedDto: UpdateMedDto) {
    return this.medsService.update(id, updateMedDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.medsService.remove(id);
  }
}
