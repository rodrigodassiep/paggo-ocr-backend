import {
    Injectable,
    NotFoundException,
    UnauthorizedException,
  } from '@nestjs/common';
  import { PrismaService } from './../prisma/prisma.service';
  import { JwtService } from '@nestjs/jwt';
  import { AuthEntity } from './entity/auth.entity';
  import * as bcrypt from 'bcrypt';
  
  @Injectable()
  export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  
    async login(email: string, password: string): Promise<AuthEntity> {
      const user = await this.prisma.user.findUnique({ where: { email: email } });
  
      if (!user) {
        throw new NotFoundException(`No user found for email: ${email}`);
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }
  
      return {
        accessToken: this.jwtService.sign({ userId: user.id }),
      };
    }

    async retrieveUser(token: string) {
      try {
        const decoded = this.jwtService.verify(token);
        const userId = decoded.userId;
        const user = await this.prisma.user.findUnique({
          where: { id: userId },
        });
        return user;
      } catch (error) {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }