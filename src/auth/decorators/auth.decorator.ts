import { applyDecorators, UseGuards } from '@nestjs/common';
import { RolesGuard } from '../guard/roles.guard';
import { Roles } from './roles.decorator';
import { Role } from '../enums/rol.enum';
import { AuthGuard } from '../auth.guard';

export function Auth(role: Role) {
  return applyDecorators(Roles(role), UseGuards(AuthGuard, RolesGuard));
}
