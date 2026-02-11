import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.restaurant.findMany();
  }

  create(name: string) {
    return this.prisma.restaurant.create({ data: { name } });
  }
}
