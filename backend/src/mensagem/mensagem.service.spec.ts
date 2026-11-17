
import { Test, TestingModule } from '@nestjs/testing';
import { MensagemService } from './mensagem.service';
import { PrismaService } from '../prisma/prisma.service';

describe('MensagemService', () => {
  let service: MensagemService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      mensagem: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MensagemService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<MensagemService>(MensagemService);
  });

  it('deve criar uma mensagem', async () => {
    prisma.mensagem.create.mockResolvedValue({ id: 1, texto: 'Olá' });

    const resultado = await service.criar({ texto: 'Olá' });

    expect(resultado.id).toBe(1);
  });

  it('deve listar as mensagens', async () => {
    prisma.mensagem.findMany.mockResolvedValue([{ id: 1 }]);

    const resultado = await service.listar();

    expect(resultado).toHaveLength(1);
  });

  it('deve buscar uma mensagem pelo ID', async () => {
    prisma.mensagem.findUnique.mockResolvedValue({ id: 1 });

    const resultado = await service.buscar(1);

    expect(resultado?.id).toBe(1);
  });

  it('deve excluir uma mensagem', async () => {
    prisma.mensagem.delete.mockResolvedValue({ id: 1 });

    const resultado = await service.deletar(1);

    expect(resultado.id).toBe(1);
  });
});
