import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { CurtidaService } from './curtida.service';

@Controller('curtida')
export class CurtidaController {
  constructor(private readonly curtidaService: CurtidaService) {}

  @Post()
  criar(@Body() data: any) {
    return this.curtidaService.criar(data);
  }

  @Get()
  listar() {
    return this.curtidaService.listar();
  }

  @Delete(':id')
  deletar(@Param('id') id: string) {
    return this.curtidaService.deletar(+id);
  }
}