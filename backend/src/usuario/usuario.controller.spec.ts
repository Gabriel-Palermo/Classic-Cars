
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';

describe('UsuarioController', () => {
  let controller: UsuarioController;
  let service: any;

  beforeEach(async () => {
    service = {
      criar: jest.fn(),
      listar: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioController],
      providers: [{ provide: UsuarioService, useValue: service }],
    }).compile();

    controller = module.get<UsuarioController>(UsuarioController);
  });

  it('deve criar usuário', async () => {
    const dados = { nome: 'Gabriel' };
    await controller.criar(dados);
    expect(service.criar).toHaveBeenCalledWith(dados);
  });

  it('deve listar usuários', async () => {
    await controller.listar();
    expect(service.listar).toHaveBeenCalled();
  });
});
