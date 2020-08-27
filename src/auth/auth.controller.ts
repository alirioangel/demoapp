import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from '../user/user.dto';
import { LoginInputsDTO } from './auth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactsDTO } from '../contact.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService) {
  }

  @ApiResponse({ status: 201, description: 'Login successfully',type: [LoginDTO]})
  @ApiResponse({ status: 403, description: 'Bad Request.'})
  @Post('login')
  login(@Body() payload:LoginInputsDTO): Promise<LoginDTO>{
    return this.authService.login(payload.email,payload.password);
  }
}
