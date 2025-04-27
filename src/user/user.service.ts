import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

type SafeUser = Omit<User, 'password'> & { password?: undefined };

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<SafeUser> {
    const hashedPassword = await hashPassword(data.password as string);
    const userWithoutPassword = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return userWithoutPassword;
  }

  async createWithParams(
    userName: string,
    email: string,
    password: string,
  ): Promise<SafeUser> {
    const hashedPassword = await hashPassword(password);
    const userWithoutPassword = await this.prisma.user.create({
      data: {
        name: userName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return userWithoutPassword;
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({ include: { profile: true } });
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id },
      include: { profile: true },
    });
  }

  async update(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async updateUserAndProfile(
    userId: number,
    userData: Prisma.UserUpdateInput,
    profileData: Prisma.UserProfileUpdateInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        ...userData,
        profile: {
          update: profileData,
        },
      },
      include: { profile: true },
    });
  }
}
