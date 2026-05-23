import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
<<<<<<< HEAD
  Patch,
=======
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
  Post,
} from '@nestjs/common';

import { AnuncioService } from './anuncio.service';

@Controller('anuncio')
export class AnuncioController {
<<<<<<< HEAD
=======

>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
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

<<<<<<< HEAD
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

=======
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.anuncioService.deletar(Number(id));
  }
}