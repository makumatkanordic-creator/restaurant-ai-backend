import { Controller, Get, Post, Body } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private service: RestaurantsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Post()
  create(@Body('name') name: string) {
    return this.service.create(name);
  }
}
