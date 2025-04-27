import { Controller, Get, Post, Param, Body } from '@nestjs/common';
// import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('postId/:email')
  postHello(@Body() body, @Param('email') params) {
    console.log(params);
    return 'Post Hello param';
  }

  @Post(':soMot/:soHai')
  getSum(@Param('soMot') soMot: string, @Param('soHai') soHai: string): number {
    return this.appService.getSum(Number(soMot), Number(soHai));
  }
}
