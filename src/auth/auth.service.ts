import { Injectable } from '@nestjs/common/decorators/core';
import { compare } from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}
  async validateUser(email: string, password: string) {
    const user = await this.usersService.findOne(email, {
      UserId: true,
      Email: true,
      Password: true,
    });
    const isMatch = await compare(password, user.Password);
    if (user && isMatch) {
      return user;
    }
    return null;
  }
}
