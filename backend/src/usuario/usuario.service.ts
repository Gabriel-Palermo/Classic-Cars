import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsuarioService {

  constructor(private prisma: PrismaService) {}

  async criar(data: any) {
    return this.prisma.usuario.create({
      data,
    });
  }

  async listar() {
    return this.prisma.usuario.findMany();
  }
}