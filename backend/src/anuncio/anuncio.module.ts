import { Module } from '@nestjs/common';
import { AnuncioController } from './anuncio.controller';
import { AnuncioService } from './anuncio.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AnuncioController],
  providers: [AnuncioService],
})
export class AnuncioModule {}