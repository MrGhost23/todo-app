import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { CreateUserDto } from './dtos/create-user.dto';
import { isEmail } from 'class-validator';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
      const createdUser = new this.userModel(createUserDto);
      return createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().select('-password').exec();
    }

    async findOne(identifier: string): Promise<User | undefined> {
        if (isEmail(identifier)) {
          return this.userModel.findOne({ email: identifier });
        } else {
          return this.userModel.findById(identifier);
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).select('-password').exec();
    }
    
    async delete(id: string): Promise<User> {
        return this.userModel.findByIdAndDelete(id).select('-password').exec();
    }
}
