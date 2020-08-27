import { IsNotEmpty, IsString, ValidateNested } from 'class-validator';

export class UserDTO{
  @IsString()
  _id:string;
  @IsString()
  @IsNotEmpty()
  username:string;
  @IsNotEmpty()
  @IsString()
  password:string;
  @IsNotEmpty()
  @IsString()
  email:string;
  @IsNotEmpty()
  @IsString()
  role:string;
}

export class LoginDTO{
  @ValidateNested()
  user:UserDTO;
  @IsString()
  token:string;
}