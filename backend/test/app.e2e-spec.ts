
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('Classic Cars - Testes de Integração', () => {
  let app: INestApplication<App>;

  const prismaMock = {
    usuario: {
      create: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
    anuncio: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
    curtida: {
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
    mensagem: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
      deleteMany: jest.fn(),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET / deve retornar Hello World', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('GET /usuario deve listar usuários', async () => {
    prismaMock.usuario.findMany.mockResolvedValue([
      { id: 1, nome: 'Gabriel' },
    ]);

    const resposta = await request(app.getHttpServer())
      .get('/usuario')
      .expect(200);

    expect(resposta.body).toHaveLength(1);
    expect(resposta.body[0].nome).toBe('Gabriel');
  });

  it('POST /usuario deve cadastrar usuário', async () => {
    prismaMock.usuario.create.mockResolvedValue({
      id: 1,
      nome: 'Gabriel',
      email: 'gabriel@email.com',
    });

    const resposta = await request(app.getHttpServer())
      .post('/usuario')
      .send({
        nome: 'Gabriel',
        email: 'gabriel@email.com',
      })
      .expect(201);

    expect(resposta.body.id).toBe(1);
    expect(prismaMock.usuario.create).toHaveBeenCalled();
  });

  it('GET /anuncio deve listar anúncios com quantidade de curtidas', async () => {
    prismaMock.anuncio.findMany.mockResolvedValue([
      {
        id: 1,
        modelo: 'Kadett GSi',
        curtidas: [{ id: 1 }, { id: 2 }],
      },
    ]);

    const resposta = await request(app.getHttpServer())
      .get('/anuncio')
      .expect(200);

    expect(resposta.body[0].modelo).toBe('Kadett GSi');
    expect(resposta.body[0].likes).toBe(2);
  });

  it('POST /anuncio deve criar anúncio', async () => {
    prismaMock.anuncio.create.mockImplementation(({ data }) =>
      Promise.resolve({ id: 1, ...data }),
    );

    const resposta = await request(app.getHttpServer())
      .post('/anuncio')
      .send({
        modelo: 'Kadett GSi',
        ano: 1995,
        km: 100000,
        combustivel: 'Gasolina',
        cidade: 'Guarapuava',
        motor: '2.0',
        cor: 'Preto',
        precoAvista: 30000,
        precoAprazo: 35000,
        parcelas: 12,
        imagens: [],
        usuarioId: 1,
      })
      .expect(201);

    expect(resposta.body.id).toBe(1);
    expect(resposta.body.status).toBe('pendente');
  });

  it('GET /mensagem deve listar mensagens', async () => {
    prismaMock.mensagem.findMany.mockResolvedValue([
      { id: 1, texto: 'Tenho interesse no veículo' },
    ]);

    const resposta = await request(app.getHttpServer())
      .get('/mensagem')
      .expect(200);

    expect(resposta.body).toHaveLength(1);
  });

  it('POST /mensagem deve criar mensagem', async () => {
    prismaMock.mensagem.create.mockResolvedValue({
      id: 1,
      texto: 'Tenho interesse',
    });

    const resposta = await request(app.getHttpServer())
      .post('/mensagem')
      .send({
        texto: 'Tenho interesse',
        usuarioId: 1,
        anuncioId: 1,
      })
      .expect(201);

    expect(resposta.body.id).toBe(1);
  });

  it('GET /curtida deve listar curtidas', async () => {
    prismaMock.curtida.findMany.mockResolvedValue([
      { id: 1, usuarioId: 1, anuncioId: 1 },
    ]);

    const resposta = await request(app.getHttpServer())
      .get('/curtida')
      .expect(200);

    expect(resposta.body).toHaveLength(1);
  });

  it('POST /curtida deve criar curtida', async () => {
    prismaMock.curtida.create.mockResolvedValue({
      id: 1,
      usuarioId: 1,
      anuncioId: 1,
    });

    const resposta = await request(app.getHttpServer())
      .post('/curtida')
      .send({ usuarioId: 1, anuncioId: 1 })
      .expect(201);

    expect(resposta.body.id).toBe(1);
  });
});
