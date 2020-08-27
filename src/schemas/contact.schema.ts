import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { DirectionDTO } from '../contact.dto';

@Schema()
export class Contact extends Document {
  @Prop({required: true})
  name: string;

  @Prop({required: true})
  direction: DirectionDTO

  @Prop({required: true,unique:true})
  phone: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);