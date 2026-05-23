import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD

  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(3001);
}

bootstrap();
=======
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
