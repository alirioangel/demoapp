import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDTO, UserDTO } from '../user/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly issuer = this.configService.get('auth.options.issuer');
  private readonly audience = this.configService.get('auth.options.audience');
  private readonly expiresIn = this.configService.get('auth.options.expiresIn');
  private readonly expireReset = this.configService.get('auth.options.expireReset');

  constructor(private readonly usersService:UserService,
              private readonly jwtService: JwtService,
              private readonly configService:ConfigService) {
  }

  async validate(payload): Promise<UserDTO> {
    try{
        return (await this.usersService.findOne(payload.id));
    }catch (e) {
      throw new UnauthorizedException('Error', 'El usuario no existe');
    }
  }

  async sign(user: UserDTO): Promise<string> {
    return await this.jwtService.signAsync(
      {
        id: user._id,
        role: user.role,
        email: user.email
      },
      { expiresIn: this.expiresIn },
    );
  }

  async decodeRequest(request:any): Promise<any> {
    if (!request.headers || !request.headers.authorization) return false;
    const token: string = request.headers.authorization.substr(7);
    const decodedToken = this.decodeToken(token);
    request.user = await this.usersService.findOne(
      decodedToken.id
    );
    request.role = request.user.role;
    return decodedToken;
  }

  decodeToken = (token:string): any =>
    this.jwtService.verify(token, {
      audience: this.audience,
      issuer: this.issuer,
    });

  async login(email, password): Promise<LoginDTO> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && await this.usersService.comparePassword(password, user.password)) {
      const token = await this.sign(user);
      return { user, token };
    }
    throw new NotFoundException('El correo es incorrecto');

  }
}
