
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('AuthService', () => {
  let service: AuthService;
  let prisma: any;
  let jwtService: any;

  beforeEach(async () => {
    prisma = {
      usuario: {
        findUnique: jest.fn(),
        create: jest.fn(),
      },
    };

    jwtService = { sign: jest.fn().mockReturnValue('token-teste') };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
    jwtService.sign.mockReturnValue('token-teste');
  });

  it('deve realizar login com credenciais corretas', async () => {
    prisma.usuario.findUnique.mockResolvedValue({
      id: 1,
      email: 'teste@email.com',
      senha: 'hash',
      tipo: 'cliente',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);

    const resultado = await service.login({
      email: ' TESTE@EMAIL.COM ',
      senha: '123',
    });

    expect(resultado.token).toBe('token-teste');
    expect(jwtService.sign).toHaveBeenCalled();
  });

  it('deve rejeitar login de usuário inexistente', async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);

    await expect(
      service.login({ email: 'naoexiste@email.com', senha: '123' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve rejeitar senha incorreta', async () => {
    prisma.usuario.findUnique.mockResolvedValue({
      id: 1,
      email: 'teste@email.com',
      senha: 'hash',
    });
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(
      service.login({ email: 'teste@email.com', senha: 'errada' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('deve cadastrar um usuário', async () => {
    prisma.usuario.findUnique.mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue('senha-hash');
    prisma.usuario.create.mockResolvedValue({ id: 1, nome: 'Gabriel' });

    const resultado = await service.register({
      nome: ' Gabriel ',
      email: ' TESTE@EMAIL.COM ',
      senha: '123',
    });

    expect(resultado.id).toBe(1);
    expect(prisma.usuario.create).toHaveBeenCalledWith({
      data: {
        nome: 'Gabriel',
        email: 'teste@email.com',
        senha: 'senha-hash',
        tipo: 'cliente',
      },
    });
  });

  it('deve impedir cadastro com email já existente', async () => {
    prisma.usuario.findUnique.mockResolvedValue({ id: 1 });

    await expect(
      service.register({
        nome: 'Gabriel',
        email: 'teste@email.com',
        senha: '123',
      }),
    ).rejects.toThrow(BadRequestException);
  });
});
