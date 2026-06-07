import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async login(data: any) {
    const email = data.email.trim().toLowerCase();

    const usuario = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (!usuario) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const senhaCorreta = await bcrypt.compare(data.senha, usuario.senha);

    if (!senhaCorreta) {
      throw new UnauthorizedException('Senha inválida');
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

  async register(data: any) {
    const email = data.email.trim().toLowerCase();

    const usuarioExiste = await this.prisma.usuario.findUnique({
      where: { email },
    });

    if (usuarioExiste) {
      throw new BadRequestException('Email já cadastrado');
    }

    const senhaHash = await bcrypt.hash(data.senha, 10);

    return this.prisma.usuario.create({
      data: {
        nome: data.nome.trim(),
        email,
        senha: senhaHash,
        tipo: data.tipo || 'cliente',
      },
    });
  }
}