import { BadRequestException, Body, Controller, Get, Headers, HttpException, HttpStatus, NotFoundException, Param, Post, Req, Patch, Delete, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';

import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiTags, ApiOperation } from '@nestjs/swagger';
import { UserLoginDto } from './dto';
import { UserService } from './user.service';
// import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Prisma, User } from '@prisma/client';



@ApiTags("Users")
@Controller('users')
export class UserController {
    constructor(
        private userService: UserService,
    ) { }

    @Post()
    create(@Body() createUserDto: Prisma.UserCreateInput) {
      return this.userService.create(createUserDto);
    }
  
    @Post(':userName/:email/:password')
    @ApiOperation({
      summary: 'Create New User',
      description: `
          * username: user name
          * email: provide user email
          * password: provide user password
          `,
    })
    createFromParams(
      @Param('userName') userName: string,
      @Param('email') email: string,
      @Param('password') password: string,
    ) {
      return this.userService.createWithParams(userName, email, password);
    }
    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserDto: Prisma.UserUpdateInput) {
        return this.userService.update(+id, updateUserDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userService.remove(+id);
    }
    @Patch(':id/full')
    updateUserAndProfile(
        @Param('id') id: string,
        @Body()
        body: {
        userData: Prisma.UserUpdateInput;
        profileData: Prisma.UserProfileUpdateInput;
        },
    ) {
        return this.userService.updateUserAndProfile(+id, body.userData, body.profileData);
    }

}
