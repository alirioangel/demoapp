import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesGuard } from '../auth/role.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService:UserService) {
  }

  @ApiResponse({ status: 201, description: 'Verifying user',type: [UserDTO]})
  @ApiResponse({ status: 403, description: 'Bad Request.'})
  @UseGuards(RolesGuard)
  @Get(':id')
  getUser(@Param('id') id:string):Promise<UserDTO>{
    return this.userService.findOne(id);
  }


  @ApiResponse({ status: 201, description: 'The record has been successfully get.',type: [UserDTO]})
  @ApiResponse({ status: 403, description: 'Bad Request.'})
  @UseGuards(RolesGuard)
  @Post()
  createUser(@Body() payload: UserDTO):Promise<UserDTO>{
    return this.userService.createUser(payload);
  }

}
