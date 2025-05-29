import { Body, Controller, Get, HttpCode, HttpException, Patch, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('login')
export class LoginController {
    constructor(private authService: AuthService) {}

    @Post()
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto);
        if (!user) throw new UnauthorizedException;
        return user;
    }
}
