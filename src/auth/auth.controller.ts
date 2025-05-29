import { Body, Controller, Get, HttpCode, HttpException, Patch, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login() {
        console.log("1");
        return 'Hello World';
    }
}
