import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(userId: string, title: string, dueDate: Date, isCompleted: boolean = false): Promise<Task> {
    const newTask = new this.taskModel({ title, dueDate, isCompleted, user: userId });
    return newTask.save();
  }

  async findAll(userId: string): Promise<Task[]> {
    return this.taskModel.find({ user: userId }).exec();
  }

  async findOne(userId: string, taskId: string): Promise<Task> {
    return this.taskModel.findOne({ _id: taskId, user: userId }).exec();
  }

  async delete(id: string): Promise<Task> {
    return this.taskModel.findByIdAndDelete(id).exec();
  }

  async update(id: string, title: string, dueDate: Date, isCompleted: boolean): Promise<Task> {
    return this.taskModel.findByIdAndUpdate(id, { title, dueDate, isCompleted }, { new: true }).exec();
  }
}