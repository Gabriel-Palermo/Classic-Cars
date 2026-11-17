
import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioService } from './anuncio.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AnuncioService', () => {
  let service: AnuncioService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      anuncio: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      curtida: { deleteMany: jest.fn() },
      mensagem: { deleteMany: jest.fn() },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnuncioService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get<AnuncioService>(AnuncioService);
  });

  it('deve criar um anúncio', async () => {
    const dados = { modelo: 'Kadett', usuarioId: 1 };
    prisma.anuncio.create.mockResolvedValue({ id: 1, ...dados });

    const resultado = await service.criar(dados);

    expect(resultado.id).toBe(1);
    expect(prisma.anuncio.create).toHaveBeenCalled();
  });

  it('deve listar anúncios com quantidade de curtidas', async () => {
    prisma.anuncio.findMany.mockResolvedValue([
      { id: 1, curtidas: [{ id: 1 }, { id: 2 }] },
    ]);

    const resultado = await service.listar();

    expect(resultado[0].likes).toBe(2);
  });

  it('deve buscar um anúncio pelo ID', async () => {
    prisma.anuncio.findUnique.mockResolvedValue({ id: 1 });

    const resultado = await service.buscar(1);

    expect(resultado?.id).toBe(1);
    expect(prisma.anuncio.findUnique).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: 1 } }),
    );
  });

  it('deve atualizar o status de um anúncio pendente', async () => {
    prisma.anuncio.findUnique.mockResolvedValue({ id: 1, status: 'pendente' });
    prisma.anuncio.update.mockResolvedValue({ id: 1, status: 'aprovado' });

    const resultado = await service.atualizarStatus(1, 'aprovado');

    expect(resultado.status).toBe('aprovado');
  });

  it('deve lançar erro quando o anúncio não existe ao atualizar status', async () => {
    prisma.anuncio.findUnique.mockResolvedValue(null);

    await expect(service.atualizarStatus(1, 'aprovado'))
      .rejects.toThrow(NotFoundException);
  });

  it('deve impedir a atualização de anúncio já processado', async () => {
    prisma.anuncio.findUnique.mockResolvedValue({ id: 1, status: 'aprovado' });

    await expect(service.atualizarStatus(1, 'reprovado'))
      .rejects.toThrow(BadRequestException);
  });

  it('deve retornar o anúncio ao curtir', async () => {
    prisma.anuncio.findUnique.mockResolvedValue({ id: 1 });

    const resultado = await service.curtir(1);

    expect(resultado.id).toBe(1);
  });

  it('deve lançar erro ao curtir anúncio inexistente', async () => {
    prisma.anuncio.findUnique.mockResolvedValue(null);

    await expect(service.curtir(1)).rejects.toThrow(NotFoundException);
  });

  it('deve excluir curtidas, mensagens e anúncio', async () => {
    prisma.anuncio.delete.mockResolvedValue({ id: 1 });

    const resultado = await service.deletar(1);

    expect(prisma.curtida.deleteMany).toHaveBeenCalled();
    expect(prisma.mensagem.deleteMany).toHaveBeenCalled();
    expect(resultado.id).toBe(1);
  });
});
