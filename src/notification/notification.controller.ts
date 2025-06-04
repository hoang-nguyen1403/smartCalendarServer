import { Body, Controller, Get, HttpCode, HttpException, Patch, Post, Delete, UseGuards, Req, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { NotificationDto } from './dto/notification.dto';
import { JwtGuard } from 'src/auth/guard/jwt-auth-guard';
import { Request } from 'express';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationController {
    constructor(private notificationService: NotificationService) {}

    @UseGuards(JwtGuard)
    @Post()
    createNotification(@Req() req: Request, @Body() notificationDto: NotificationDto) {
        const user = req.user;
        const user_id = user?.['id'];

        return this.notificationService.createNotification(notificationDto, user_id);
    }

    @UseGuards(JwtGuard)
    @Get()
    getNotifications(@Req() req: Request) {
        const user = req.user;
        const user_id = user?.['id'];

        return this.notificationService.getNotifications(user_id);
    }
}