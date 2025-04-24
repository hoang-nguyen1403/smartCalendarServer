import { ApiProperty } from "@nestjs/swagger"

//DTO : data transfer object
export class UserDTO {
    @ApiProperty({ description: "id", type: Number })
    id: number;

    @ApiProperty({ description: "Full Name", type: String })
    name: string;

    @ApiProperty({ description: "email", type: String })
    email: string;

    @ApiProperty({ description: "password", type: String })
    password: string;

    @ApiProperty({ description: "DOB", type: String })
    birth_day: string;
}

export class UserLoginDto {

    @ApiProperty({ description: "email", type: String })
    email: string;

    @ApiProperty({ description: "password", type: String })
    password: string;
   
}