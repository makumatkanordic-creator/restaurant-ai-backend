import { Controller, Get } from '@nestjs/common';

@Controller('items')
export class ItemsController {
  @Get()
  findAll() {
    return [
      { id: 1, name: 'Pizza', price: 12 },
      { id: 2, name: 'Burger', price: 9 },
      { id: 3, name: 'Pasta', price: 11 },
    ];
  }
}
