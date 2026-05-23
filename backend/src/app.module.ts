import { Module } from '@nestjs/common';
<<<<<<< HEAD

=======
import { AppController } from './app.controller';
import { AppService } from './app.service';
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AnuncioModule } from './anuncio/anuncio.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { CurtidaModule } from './curtida/curtida.module';
<<<<<<< HEAD
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
=======
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3

@Module({
  imports: [
    PrismaModule,
    UsuarioModule,
    AnuncioModule,
    MensagemModule,
    CurtidaModule,
<<<<<<< HEAD
    AuthModule,
=======
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
  ],

  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}