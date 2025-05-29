import { Body, Controller, Get, HttpCode, HttpException, Patch, Post, Delete, UseGuards, Req, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';
import { JwtGuard } from 'src/auth/guard/jwt-auth-guard';
import { Request } from 'express';
import { EventDto } from './dto/event.dto';
import { Prisma } from '@prisma/client';

@ApiTags('Events')
@Controller('events')
export class EventController {
    constructor(private eventService: EventService) {}

    @UseGuards(JwtGuard)
    @Post()
    createEvent(@Req() req: Request, @Body() eventDto: EventDto) {
        const user = req.user;
        const user_id = user?.['id']

        return this.eventService.createEvent(eventDto, user_id);
    }

    @UseGuards(JwtGuard)
    @Get('')
    getAllEvents(@Req() req: Request) {
        const user = req.user;
        const user_id = user?.['id']

        return this.eventService.getAllEvents(user_id);
    }

    @UseGuards(JwtGuard)
    @Get(':date')
    getEventsOnDate(@Req() req: Request, @Param('date') date: string) {
        const user = req.user;
        const user_id = user?.['id']

        return this.eventService.getEventsOnDate(date, user_id);
    }

    @UseGuards(JwtGuard)
    @Patch(':event_id')
    updateEvent(@Req() req: Request, @Param('event_id') event_id: string, @Body() updateEventDto: Prisma.EventUpdateInput) {
        const user = req.user;
        const user_id = user?.['id']

        return this.eventService.updateEvent(Number(event_id), Number(user_id), updateEventDto);
    }

    @UseGuards(JwtGuard)
    @Delete(':event_id')
    deleteEvent(@Req() req: Request, @Param('event_id') event_id: string) {
        const user = req.user;
        const user_id = user?.['id']

        return this.eventService.removeEvent(Number(event_id), Number(user_id));
    }
}