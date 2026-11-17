
import { Test, TestingModule } from '@nestjs/testing';
import { MensagemController } from './mensagem.controller';
import { MensagemService } from './mensagem.service';

describe('MensagemController', () => {
  let controller: MensagemController;
  let service: any;

  beforeEach(async () => {
    service = {
      criar: jest.fn(),
      listar: jest.fn(),
      buscar: jest.fn(),
      deletar: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [MensagemController],
      providers: [{ provide: MensagemService, useValue: service }],
    }).compile();

    controller = module.get<MensagemController>(MensagemController);
  });

  it('deve criar mensagem', () => {
    const dados = { texto: 'Olá' };
    controller.criar(dados);
    expect(service.criar).toHaveBeenCalledWith(dados);
  });

  it('deve listar mensagens', () => {
    controller.listar();
    expect(service.listar).toHaveBeenCalled();
  });

  it('deve buscar mensagem convertendo ID para número', () => {
    controller.buscar('4');
    expect(service.buscar).toHaveBeenCalledWith(4);
  });

  it('deve excluir mensagem convertendo ID para número', () => {
    controller.deletar('4');
    expect(service.deletar).toHaveBeenCalledWith(4);
  });
});
