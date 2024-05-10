import { Controller, Post, Body, Get, Param, UseGuards, Request, Delete, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    return this.taskService.create(req.user._id, createTaskDto.title, createTaskDto.dueDate, createTaskDto.isCompleted);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAllByUser(@Request() req) {
    return this.taskService.findAll(req.user._id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':taskId')
  async findOne(@Request() req, @Param('taskId') taskId: string) {
    return this.taskService.findOne(req.user._id,taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: CreateTaskDto) {
    return this.taskService.update(id, updateTaskDto.title, updateTaskDto.dueDate, updateTaskDto.isCompleted);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/toggleComplete')
  async toggleComplete(@Param('id') id: string) {
    return this.taskService.toggleComplete(id);
  }
}
