import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { MongooseModule } from '@nestjs/mongoose'
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    MongooseModule.forFeature([{name: Contact.name, schema: ContactSchema}])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
