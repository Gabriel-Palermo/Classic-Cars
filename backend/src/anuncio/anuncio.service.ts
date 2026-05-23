import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnuncioService {
  constructor(private prisma: PrismaService) {}

  async criar(data: any) {
    return this.prisma.anuncio.create({
      data,
    });
  }

  async listar() {
    return this.prisma.anuncio.findMany({
      include: {
        usuario: true,
      },
    });
  }

  async buscar(id: number) {
    return this.prisma.anuncio.findUnique({
      where: { id },
      include: {
        usuario: true,
      },
    });
  }

  async atualizarStatus(id: number, status: string) {
    return this.prisma.anuncio.update({
      where: { id },
      data: { status },
    });
  }

  async deletar(id: number) {
    return this.prisma.anuncio.delete({
      where: { id },
    });
  }
}