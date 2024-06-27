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

@Controller('tasks')
export class TaskController {
  @Get()
  getAll(): string {
    return 'return all';
  }

  @Get(':id')
  getById(@Param('id') id: string): string {
    console.log(id);
    return 'get by id';
  }

  @Post('')
  add(@Body() taskAddDto: TaskAddDto): string {
    console.log(taskAddDto);
    return 'add';
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() taskUpdateDto: TaskUpdateDto,
  ): string {
    console.log(id);
    console.log(taskUpdateDto);
    return 'update';
  }

  @Delete(':id')
  delete(): string {
    return 'delete';
  }
}
