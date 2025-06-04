import { Injectable } from '@nestjs/common';
import { EventDto } from './dto/event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Event } from '@prisma/client';
import { startOfDay, endOfDay, parseISO } from 'date-fns';

@Injectable()
export class EventService {
    constructor(private prisma: PrismaService) {}
    
    async createEvent(eventDto: EventDto, user_id: string) {
        const event = await this.prisma.event.create({
            data: { user_id: Number(user_id), ...eventDto }
        });
        return event;
    }

    async getAllEvents(user_id: string) {
        return this.prisma.event.findMany({
            where: { user_id: Number(user_id), },
        });
    }

    async getEventsOnDate(date: string, user_id: string) {
        const startdate = startOfDay(date).toISOString();
        const enddate = endOfDay(date).toISOString();

        return this.prisma.event.findMany({
            where: {
                user_id: Number(user_id),
                startdatetime: {gte: startdate},
                enddatetime: {lte: enddate},
            },
        });
    }

    async updateEvent(event_id: number, user_id: number, data: Prisma.EventUpdateInput) {
        return this.prisma.event.update({ where: { user_id_event_id: {user_id, event_id} }, data });
    }

    async removeEvent(event_id: number, user_id: number) {
        return this.prisma.event.delete({ where: { user_id_event_id: {user_id, event_id} } });
    }
}