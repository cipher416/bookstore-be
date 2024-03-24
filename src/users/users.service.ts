import { PrismaService } from 'src/prisma.service';
import { hash } from 'bcrypt';
import { Prisma, User } from '@prisma/client';
import { Injectable } from '@nestjs/common/decorators/core';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async addUser(email: string, password: string) {
    const hashedPassword = await hash(password, 10);
    await this.prisma.user.create({
      data: {
        Email: email,
        Password: hashedPassword,
      },
    });
  }
  async findOne(
    email: string,
    select: Prisma.UserSelect,
  ): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        Email: email,
      },
      select: select,
    });
  }
}
