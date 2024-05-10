import { Controller, Post, Body, Get, Param, UseGuards, Request } from '@nestjs/common';
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
}
