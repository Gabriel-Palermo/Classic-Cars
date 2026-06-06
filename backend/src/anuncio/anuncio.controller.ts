import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { AnuncioService } from './anuncio.service';

@Controller('anuncio')
export class AnuncioController {
  constructor(private readonly anuncioService: AnuncioService) {}

  @Post()
  criar(@Body() data: any) {
    return this.anuncioService.criar(data);
  }

  @Get()
  listar() {
    return this.anuncioService.listar();
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.anuncioService.buscar(Number(id));
  }

  @Patch(':id/status')
  atualizarStatus(
    @Param('id') id: string,
    @Body() data: any
  ) {
    return this.anuncioService.atualizarStatus(
      Number(id),
      data.status
    );
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.anuncioService.deletar(Number(id));
  }
}