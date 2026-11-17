
import { Test, TestingModule } from '@nestjs/testing';
import { AnuncioController } from './anuncio.controller';
import { AnuncioService } from './anuncio.service';

describe('AnuncioController', () => {
  let controller: AnuncioController;
  let service: any;

  beforeEach(async () => {
    service = {
      criar: jest.fn(),
      listar: jest.fn(),
      buscar: jest.fn(),
      atualizarStatus: jest.fn(),
      curtir: jest.fn(),
      deletar: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnuncioController],
      providers: [{ provide: AnuncioService, useValue: service }],
    }).compile();

    controller = module.get<AnuncioController>(AnuncioController);
  });

  it('deve criar anúncio', () => {
    const dados = { modelo: 'Kadett' };
    controller.criar(dados);
    expect(service.criar).toHaveBeenCalledWith(dados);
  });

  it('deve listar anúncios', () => {
    controller.listar();
    expect(service.listar).toHaveBeenCalled();
  });

  it('deve buscar anúncio convertendo ID para número', () => {
    controller.buscar('5');
    expect(service.buscar).toHaveBeenCalledWith(5);
  });

  it('deve atualizar status do anúncio', () => {
    controller.atualizarStatus('5', { status: 'aprovado' });
    expect(service.atualizarStatus).toHaveBeenCalledWith(5, 'aprovado');
  });

  it('deve curtir anúncio', () => {
    controller.curtir('5');
    expect(service.curtir).toHaveBeenCalledWith(5);
  });

  it('deve excluir anúncio', () => {
    controller.deletar('5');
    expect(service.deletar).toHaveBeenCalledWith(5);
  });
});
