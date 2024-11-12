import { Module } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [InvoicesController],
  providers: [InvoicesService],
  imports: [PrismaModule, AuthModule, ConfigModule],
  exports: [InvoicesService],
})
export class InvoicesModule {}
