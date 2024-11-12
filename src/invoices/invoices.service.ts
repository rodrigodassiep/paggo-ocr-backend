import { Injectable } from '@nestjs/common';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { createWorker } from 'tesseract.js';
import { AuthService } from 'src/auth/auth.service';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class InvoicesService {
  constructor(private prisma: PrismaService, private authService: AuthService, private configService : ConfigService) { }

  async create(createInvoiceDto: CreateInvoiceDto, authHeader: string) {
    const token = authHeader.split(' ')[1];
    const worker = await createWorker('por');
    const responseT = await worker.recognize(
      createInvoiceDto.image
    );


    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + this.configService.get<string>("GOOGLE_API_KEY"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "Write a summary and provide context to the following text: " + responseT.data.text }]
        }]
      }),

    });

    const json = await response.json();

    const user = await this.authService.retrieveUser(token);
    
    await this.prisma.result.create({
      data: {
        image: createInvoiceDto.image,
        content: responseT.data.text,
        summary: json.candidates[0].content.parts[0].text,
        author: {connect: { id: user.id }}, 
      }
    });

    return json.candidates[0].content.parts[0];

    
  }

  async findAllFromUser(authHeader: string) {
    const token = authHeader.split(' ')[1];
    const user = await this.authService.retrieveUser(token);

    return this.prisma.result.findMany({ where: { authorId: user.id} });
  }

}
