import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Contact } from './schemas/contact.schema';
import { Model } from 'mongoose';
import { CreateContactDTO } from './contact.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(Contact.name) private readonly contactModel: Model<Contact>) {
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  async createContact(payload: CreateContactDTO): Promise<Contact>{
    try {
      const createContact = new this.contactModel(payload);
      return await createContact.save();
    }catch (e){
      throw new BadRequestException(e,"El telefono ya existe en la base de datos");
    }

  }
}
