import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Contact } from './schemas/contact.schema';
import { CreateContactDTO } from './contact.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllContacts(): Promise<Contact[]> {
    return this.appService.findAll();
  }

  @Post()
  saveContact(@Body() payload: CreateContactDTO):Promise<Contact> {
    return this.appService.createContact(payload);
  }

}
