
import { Test, TestingModule } from '@nestjs/testing';
import { CurtidaService } from './curtida.service';
import { PrismaService } from '../prisma/prisma.service';

describe('CurtidaService', () => {
  let service: CurtidaService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      curtida: {
        create: jest.fn(),
        findMany: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurtidaService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<CurtidaService>(CurtidaService);
  });

  it('deve criar uma curtida', async () => {
    prisma.curtida.create.mockResolvedValue({ id: 1 });

    const resultado = await service.criar({ usuarioId: 1, anuncioId: 2 });

    expect(resultado.id).toBe(1);
    expect(prisma.curtida.create).toHaveBeenCalled();
  });

  it('deve listar as curtidas', async () => {
    prisma.curtida.findMany.mockResolvedValue([{ id: 1 }]);

    const resultado = await service.listar();

    expect(resultado).toHaveLength(1);
  });

  it('deve excluir uma curtida pelo ID', async () => {
    prisma.curtida.delete.mockResolvedValue({ id: 1 });

    const resultado = await service.deletar(1);

    expect(resultado.id).toBe(1);
    expect(prisma.curtida.delete).toHaveBeenCalledWith({
      where: { id: 1 },
    });
  });
});
