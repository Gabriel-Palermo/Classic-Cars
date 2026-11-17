
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from './usuario.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      usuario: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsuarioService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
  });

  it('deve criar um usuário', async () => {
    prisma.usuario.create.mockResolvedValue({ id: 1, nome: 'Gabriel' });

    const resultado = await service.criar({ nome: 'Gabriel' });

    expect(resultado.id).toBe(1);
    expect(prisma.usuario.create).toHaveBeenCalled();
  });

  it('deve listar os usuários', async () => {
    prisma.usuario.findMany.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    const resultado = await service.listar();

    expect(resultado).toHaveLength(2);
  });
});
