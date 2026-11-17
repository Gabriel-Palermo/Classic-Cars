
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: any;

  beforeEach(async () => {
    service = {
      register: jest.fn(),
      login: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: service }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('deve encaminhar cadastro ao serviço', () => {
    const dados = { nome: 'Gabriel' };
    controller.register(dados);
    expect(service.register).toHaveBeenCalledWith(dados);
  });

  it('deve encaminhar login ao serviço', () => {
    const dados = { email: 'teste@email.com', senha: '123' };
    controller.login(dados);
    expect(service.login).toHaveBeenCalledWith(dados);
  });
});
