import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnuncioService {
  constructor(private prisma: PrismaService) {}

  async criar(data: any) {
    return this.prisma.anuncio.create({
      data: {
        modelo: data.modelo,
        ano: data.ano,
        km: data.km,
        combustivel: data.combustivel,
        cidade: data.cidade,
        motor: data.motor,
        cor: data.cor,
        precoAvista: data.precoAvista,
        precoAprazo: data.precoAprazo,
        parcelas: data.parcelas,
        imagens: data.imagens,
        status: 'pendente',
        usuarioId: data.usuarioId,
      },
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
    const anuncio = await this.prisma.anuncio.findUnique({
      where: { id },
    });

    if (!anuncio) {
      throw new NotFoundException('Anúncio não encontrado');
    }

    if (anuncio.status !== 'pendente') {
      throw new BadRequestException('Este anúncio já foi processado');
    }

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