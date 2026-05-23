import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { MensagemService } from './mensagem.service';

@Controller('mensagem')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  @Post()
  criar(@Body() data: any) {
    return this.mensagemService.criar(data);
  }

  @Get()
  listar() {
    return this.mensagemService.listar();
  }

  @Get(':id')
  buscar(@Param('id') id: string) {
    return this.mensagemService.buscar(+id);
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.mensagemService.deletar(+id);
  }
}