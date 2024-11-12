import { IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateInvoiceDto {
    @IsString()
    @IsNotEmpty()
    image: string;
}