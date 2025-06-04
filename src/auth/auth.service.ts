import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService, private userService: UserService) {}

    async validateUser({ email, password }: LoginDto) {
        const userList = await this.userService.findAll();
        const findUser = userList.find((user) => user.email === email);

        if (!findUser) return null;
        if (await bcrypt.compare(password, findUser.password as string)) {
            const { name, password, phone, ...user } = findUser;
            return this.jwtService.sign(user);
        }

        return null;
    }

    async createUser(registerDto: RegisterDto) {
        return this.userService.createAccount(registerDto);
    }

    async logout() {
        // Với JWT stateless, logout phía client chỉ cần xoá token ở localStorage/cookie.
        return { message: 'Logged out successfully' };
    }
}
