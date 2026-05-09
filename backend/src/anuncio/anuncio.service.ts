import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnuncioService {

  constructor(private prisma: PrismaService) {}

  async criar(data: any) {
    return this.prisma.anuncio.create({
      data: {
        modelo: "Gol GTI",
        ano: "1994",
        km: "124000",
        combustivel: "Gasolina",
        cidade: "Curitiba",
        motor: "AP 2.0",
        cor: "Azul",

        precoAvista: "124900",
        precoAprazo: "149900",

        parcelas: "36x",
        status: "pendente",

        usuarioId: 1
      }
    });
  }

  async listar() {
    return this.prisma.anuncio.findMany();
  }

  async buscar(id: number) {
    return this.prisma.anuncio.findUnique({
      where: { id }
    });
  }

  async deletar(id: number) {
    return this.prisma.anuncio.delete({
      where: { id }
    });
  }

}