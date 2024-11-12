import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { InvoicesModule } from './invoices/invoices.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, UsersModule, InvoicesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
