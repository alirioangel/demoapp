import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Module({
  imports:[
    MongooseModule.forFeatureAsync([{
      name: User.name,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const schema = UserSchema;
        schema.pre<User>('save', function (next) {
          const user = this;
          if (!user.isModified('password')) next();
          bcrypt.hash(user.password, configService.get('auth.salt'), (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
          });
        });
        return schema;
      },
      inject: [ConfigService],
    }]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports:[UserService],
})
export class UserModule {

}
