import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Contact } from './schemas/contact.schema';
import { ContactsDTO, CreateContactDTO } from './contact.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiResponse({ status: 201, description: 'The record has been successfully get.',type: [ContactsDTO]})
  @ApiResponse({ status: 403, description: 'Bad Request.'})
  @Get()
  getAllContacts(): Promise<Contact[]> {
    return this.appService.findAll();
  }

  @ApiResponse({ status: 201, description: 'The record has been successfully created.',type: ContactsDTO})
  @ApiResponse({ status: 400, description: 'Bad Request.'})
  @Post()
  saveContact(@Body() payload: CreateContactDTO):Promise<Contact> {
    return this.appService.createContact(payload);
  }

}
