import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  direction: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  phone: string;
}

export class ContactsDTO{
  @ApiProperty()
  @IsString()
  name:string;
  @IsString()
  @ApiProperty()
  direction: string;
  @IsString()
  @ApiProperty()
  phone:string;
}