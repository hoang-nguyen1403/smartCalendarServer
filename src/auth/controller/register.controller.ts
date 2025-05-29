import { Body, Controller, Get, HttpCode, HttpException, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth.service';
import { RegisterDto } from '../dto/register.dto';

@ApiTags('Auth')
@Controller('register')
export class RegisterController {
    constructor(private authService: AuthService) {}

    @Post()
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.createUser(registerDto);
    }
}
