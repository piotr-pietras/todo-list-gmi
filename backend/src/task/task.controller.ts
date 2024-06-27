import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskAddDto } from './dto/task-add.dto';
import { TaskUpdateDto } from './dto/task-update.dto';
import { TaskService } from './task.service';
import { TaskIdQueryDto } from './dto/task-id-query.dto';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  async getAll() {
    return this.taskService.getAll();
  }

  @Get(':id')
  async getById(@Param() { id }: TaskIdQueryDto) {
    return this.taskService.getById(id);
  }

  @Post('')
  addOne(@Body() taskAddDto: TaskAddDto) {
    return this.taskService.addOne(taskAddDto);
  }

  @Put(':id')
  updateOne(
    @Param() { id }: TaskIdQueryDto,
    @Body() taskUpdateDto: TaskUpdateDto,
  ) {
    return this.taskService.updateOne(id, taskUpdateDto);
  }

  @Delete(':id')
  deleteOne(@Param() { id }: TaskIdQueryDto) {
    return this.taskService.deleteOne(id);
  }
}
