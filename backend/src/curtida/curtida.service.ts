import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CurtidaService {
  constructor(private prisma: PrismaService) {}

  async criar(data: any) {
    return this.prisma.curtida.create({
      data,
    });
  }

  async listar() {
    return this.prisma.curtida.findMany({
      include: {
        usuario: true,
        anuncio: true,
      },
    });
  }

  async deletar(id: number) {
    return this.prisma.curtida.delete({
      where: { id },
    });
  }
}