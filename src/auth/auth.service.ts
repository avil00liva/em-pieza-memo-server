import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ name, email, password }: RegisterDto) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      throw new BadRequestException('Email already exist');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.userService.create({
      name,
      email,
      password: hashedPassword,
    });

    return 'User created successfully';
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findOneByEmailWithPassword(email);

    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { email: user.email, role: user.rol };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: user.email,
    };
  }
}
