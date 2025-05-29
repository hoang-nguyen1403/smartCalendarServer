import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { LoginController } from './auth/controller/login.controller';
import { RegisterController } from './auth/controller/register.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategy/local.strategy';
import { LogoutController } from './auth/controller/logout.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    UserModule, AuthModule,
    JwtModule.register({
        secret: 'welcome_to_smart_calendar',
        signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AppController, UserController, LoginController, RegisterController, LogoutController],
  providers: [AppService, UserService, PrismaService, AuthService, LocalStrategy],
})
export class AppModule {}
