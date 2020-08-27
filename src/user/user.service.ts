import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from "mongoose";
import { User } from '../schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async createUser(payload:UserDTO):Promise<UserDTO>{
    try {
    const createUser = new this.userModel(payload);
    return await createUser.save();
  }catch (e){
    throw new BadRequestException(e,"El correo electronico ya existe en la base de datos");
  }
  }

  async findOne(id: string):Promise<UserDTO> {
    return await this.userModel.findOne({ _id: id }).exec();
  }

  findOneByEmail(email:string):Promise<UserDTO>{
    return this.userModel.findOne({email}).exec();
  }

  comparePassword(attempt: string, password: string): boolean {
    return bcrypt.compareSync(attempt, password);
  }
}
