import { Module } from '@nestjs/common';

import { CurtidaController } from './curtida.controller';
import { CurtidaService } from './curtida.service';

import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CurtidaController],
  providers: [CurtidaService],
})
export class CurtidaModule {}