import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // تسجيل دخول تجريبي (مؤقت)
  login() {
    const payload = {
      sub: 1, // userId ثابت مؤقتًا
      email: 'test@test.com',
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
