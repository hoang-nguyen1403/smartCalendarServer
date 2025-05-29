import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { LoginController, RegisterController, LogoutController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EventModule } from './event/event.module';
import { EventController } from './event/event.controller';
import { EventService } from './event/event.service';
import { NotificationModule } from './notification/notification.module';
import { NotificationController } from './notification/notification.controller';
import { NotificationService } from './notification/notification.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    UserModule, AuthModule, EventModule, NotificationModule,
    JwtModule.register({
        secret: 'welcome_to_smart_calendar',
        signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UserController, LoginController, RegisterController, LogoutController, EventController, NotificationController],
  providers: [AppService, UserService, PrismaService, AuthService, LocalStrategy, JwtStrategy, EventService, NotificationService],
})
export class AppModule {}
