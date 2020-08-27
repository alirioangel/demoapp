import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';

export const passportModule = PassportModule.register({
  defaultStrategy: 'jwt',
});
@Module({
  imports:[
    passportModule,
    UserModule,
    ConfigModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
        return {
          secret: configService.get('auth.privateKey'),
          signOptions: configService.get('auth.options'),
        };
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [passportModule, AuthService],
})
export class AuthModule {}
