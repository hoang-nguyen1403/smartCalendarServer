import { Body, Controller, Get, HttpCode, HttpException, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth.service';

@ApiTags('Auth')
@Controller('logout')
export class LogoutController {
    constructor(private authService: AuthService) {}

    @Get()
    async logout() {
        return this.authService.logout();
    }
}
