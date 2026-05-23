import { Injectable } from '@nestjs/common';
<<<<<<< HEAD
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnuncioService {
=======
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnuncioService {

>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
  constructor(private prisma: PrismaService) {}

  async criar(data: any) {
    return this.prisma.anuncio.create({
<<<<<<< HEAD
      data,
=======
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
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
    });
  }

  async listar() {
<<<<<<< HEAD
    return this.prisma.anuncio.findMany({
      include: {
        usuario: true,
      },
    });
=======
    return this.prisma.anuncio.findMany();
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
  }

  async buscar(id: number) {
    return this.prisma.anuncio.findUnique({
<<<<<<< HEAD
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
=======
      where: { id }
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
    });
  }

  async deletar(id: number) {
    return this.prisma.anuncio.delete({
<<<<<<< HEAD
      where: { id },
    });
  }
=======
      where: { id }
    });
  }

>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
}