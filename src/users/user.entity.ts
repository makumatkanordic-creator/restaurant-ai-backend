export class User {
  id: number;
  email: string;
  password: string;
  role: 'OWNER' | 'MANAGER' | 'STAFF';
  restaurantId: number;
}
