// src/users/users.controller.ts

import {
    Controller,
    Get,
    Post,
    Body,
    Headers,
    Patch,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
//import { InvoiceEntity } from './entities/invoice.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('invoices')
export class InvoicesController {
    constructor(private readonly InvoicesService: InvoicesService) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Headers('Authorization') authHeader: string, @Body() createInvoiceDto: CreateInvoiceDto) {
        return await this.InvoicesService.create(createInvoiceDto, authHeader);
        // return new UserEntity(await this.usersService.create(createUserDto));
    }
    

    @Get()
    @UseGuards(JwtAuthGuard)
    async findAll(@Headers('Authorization') authHeader: string) {
        const results = await this.InvoicesService.findAllFromUser(authHeader);
        return results;
    }

    // @Get(':id')
    // @UseGuards(JwtAuthGuard)
    // async findOne(@Param('id', ParseIntPipe) id: number) {
    //     return new UserEntity(await this.usersService.findOne(id));
    // }

    // @Patch(':id')
    // @UseGuards(JwtAuthGuard)
    // async update(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body() updateUserDto: UpdateUserDto,
    // ) {
    //     return new UserEntity(await this.usersService.update(id, updateUserDto));
    // }

    // @Delete(':id')
    // @UseGuards(JwtAuthGuard)
    // async remove(@Param('id', ParseIntPipe) id: number) {
    //     return new UserEntity(await this.usersService.remove(id));
    // }
}
