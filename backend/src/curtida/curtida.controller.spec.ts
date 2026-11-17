
import { Test, TestingModule } from '@nestjs/testing';
import { CurtidaController } from './curtida.controller';
import { CurtidaService } from './curtida.service';

describe('CurtidaController', () => {
  let controller: CurtidaController;
  let service: any;

  beforeEach(async () => {
    service = {
      criar: jest.fn(),
      listar: jest.fn(),
      deletar: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurtidaController],
      providers: [{ provide: CurtidaService, useValue: service }],
    }).compile();

    controller = module.get<CurtidaController>(CurtidaController);
  });

  it('deve criar curtida', () => {
    const dados = { usuarioId: 1, anuncioId: 2 };
    controller.criar(dados);
    expect(service.criar).toHaveBeenCalledWith(dados);
  });

  it('deve listar curtidas', () => {
    controller.listar();
    expect(service.listar).toHaveBeenCalled();
  });

  it('deve excluir curtida convertendo ID para número', () => {
    controller.deletar('3');
    expect(service.deletar).toHaveBeenCalledWith(3);
  });
});
