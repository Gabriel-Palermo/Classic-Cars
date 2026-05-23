import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // LOGIN
  async login(data: any) {
    const usuario = await this.prisma.usuario.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(
      data.senha,
      usuario.senha,
    );

    if (!senhaCorreta) {
      throw new Error('Senha inválida');
    }

    const token = this.jwtService.sign({
      id: usuario.id,
      email: usuario.email,
      tipo: usuario.tipo,
    });

    return {
      message: 'Login realizado com sucesso',
      token,
      usuario,
    };
  }

  // CADASTRO
  async register(data: any) {
    const senhaHash = await bcrypt.hash(data.senha, 10);

    return this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: senhaHash,
        tipo: data.tipo || 'cliente',
      },
    });
  }
}