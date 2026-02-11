import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      email: 'owner@test.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'OWNER',
      restaurantId: 1,
    },
    {
      id: 2,
      email: 'staff@test.com',
      password: bcrypt.hashSync('123456', 10),
      role: 'STAFF',
      restaurantId: 1,
    },
  ];

  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }
}
