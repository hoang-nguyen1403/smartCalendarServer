import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(
    // private jwt: JwtService,
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  // private prisma: PrismaClient = new PrismaClient();

  async create(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data });
  }
  async createWithParams(
    userName: string,
    email: string,
    password: string,
  ): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: userName,
        email,
        password,
      },
    });
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

  // async uploadAvatar(id: number, filename: string): Promise<boolean> {
  //     await this.prisma.nguoi_dung.update({
  //         data: { hinh_dai_dien: filename },
  //         where: {
  //             id
  //         }
  //     })

  //     return true;
  // }

  // async login(email: string, mat_khau: string): Promise<any> {

  //     let checkEmail = await this.prisma.nguoi_dung.findFirst({
  //         where: {
  //             email
  //         }
  //     })
  //     if (checkEmail) {
  //         //email đúng
  //         if (checkEmail.mat_khau == mat_khau) {
  //             let token = this.jwt.sign(checkEmail, { expiresIn: "2d", secret: this.config.get("SECRET_KEY") });

  //             //pass đúng
  //             return {
  //                 check: true,
  //                 data: token
  //             };
  //         } else {
  //             //pass sai
  //             return {
  //                 check: false,
  //                 data: "Mật khẩu sai !"
  //             };
  //         }
  //     } else {
  //         //email sai
  //         return {
  //             check: false,
  //             data: "Email sai"
  //         };;
  //     }
  // }
}
