import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MensagemService {
  constructor(private prisma: PrismaService) {}

  async criar(data: any) {
    return this.prisma.mensagem.create({
      data,
    });
  }

  async listar() {
    return this.prisma.mensagem.findMany({
      include: {
        anuncio: true,
      },
    });
  }

  async buscar(id: number) {
    return this.prisma.mensagem.findUnique({
      where: { id },
    });
  }

  async deletar(id: number) {
    return this.prisma.mensagem.delete({
      where: { id },
    });
  }
}