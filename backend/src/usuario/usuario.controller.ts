import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criar(@Body() body: any) {
    return this.usuarioService.criar(body);
  }

  @Get()
  async listar() {
    return this.usuarioService.listar();
  }
}