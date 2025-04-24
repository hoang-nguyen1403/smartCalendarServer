import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsEmail } from 'class-validator';


//DTO : data transfer object
export class UserDTO {
    @ApiProperty({ description: "Full Name", type: String })
    name: string;

    @ApiProperty({ description: "email", type: String })
    email: string;

    @ApiProperty({ description: "password", type: String, format: 'password' })
    @IsString()
    password: string;

}

export class UserLoginDto {

    @ApiProperty({ description: "email", type: String })
    email: string;

    @ApiProperty({ description: "password", type: String })
    password: string;
   
}