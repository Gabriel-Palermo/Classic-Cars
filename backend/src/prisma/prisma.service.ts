import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
<<<<<<< HEAD
  async onModuleInit() {
    await this.$connect();
  }
=======

  async onModuleInit() {
    await this.$connect();
  }

>>>>>>> 450ea8fa76eeb537302f8dff0ae5f98a014d4cf3
}