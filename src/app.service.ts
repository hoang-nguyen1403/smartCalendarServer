import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!1231';
  }
  getSum(soMot: number, soHai: number): number {
    return soMot + soHai;
  }
}
