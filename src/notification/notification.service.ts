import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotificationDto } from './dto/notification.dto';

@Injectable()
export class NotificationService {
    constructor(private prisma: PrismaService) {}

    async createNotification(notificationDto: NotificationDto, user_id: string) {
        const event = await this.prisma.notification.create({
            data: { user_id: Number(user_id), ...notificationDto }
        });
        return event;
    }

    async getNotifications(user_id: string) {
        return this.prisma.notification.findMany({
            where: { user_id: Number(user_id), },
        });
    }
}