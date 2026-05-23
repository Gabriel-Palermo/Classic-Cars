import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AnuncioModule } from './anuncio/anuncio.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { CurtidaModule } from './curtida/curtida.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    AnuncioModule,
    MensagemModule,
    CurtidaModule,
    AuthModule,
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}