import { Body, Controller, Get, HttpCode, HttpException, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './guard/jwt-auth-guard';

@ApiTags('Auth')
@Controller('register')
export class RegisterController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.createUser(registerDto);
    }
}

@ApiTags('Auth')
@Controller('login')
export class LoginController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto);
        if (!user) throw new UnauthorizedException;
        return {"token": user};
    }
}

@ApiTags('Auth')
@UseGuards(JwtGuard)
@Controller('logout')
export class LogoutController {
    constructor(private authService: AuthService) {}

    @Get()
    async logout() {
        return this.authService.logout();
    }
}