import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DirectionDTO{
  @ApiProperty()
  @IsString()
  latitude: string;
  @ApiProperty()
  @IsString()
  longitude: string;
}
export class CreateContactDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  direction: DirectionDTO;
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
  direction: DirectionDTO;
  @IsString()
  @ApiProperty()
  phone:string;
}

