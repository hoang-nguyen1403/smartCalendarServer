import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle("Smart Calendar")
    .setDescription("The Smart Calendar API description.")
    .addBearerAuth({type:"http", scheme: "bearer",  bearerFormat:"Token"}, "access-token")
    .build();
  const documentFactory = SwaggerModule.createDocument(app, config)
  app.enableCors(); // kích hoạt cho phép FE truy cập API 
  SwaggerModule.setup('', app, documentFactory);
  await app.listen(8080);
}
bootstrap();
