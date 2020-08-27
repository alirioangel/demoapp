import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { JWTMiddleware } from './auth/jwt.middleware';
import application from './config/application';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [application]
      }
    ),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{name: Contact.name, schema: ContactSchema}]),
    UserModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  private readonly limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // limit each IP to 100 requests per windowMs
  });
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        bodyParser.json({ limit: '50mb' }),
        bodyParser.urlencoded({ limit: '50mb', extended: true }),
        compression(),
        cors(),
        helmet(),
        this.limiter,
        JWTMiddleware)
      .forRoutes('*');
  }
}
