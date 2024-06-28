import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Task } from './interface/task.interface';
import { TaskAddDto } from './dto/task-add.dto';
import { TaskUpdateDto } from './dto/task-update.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<Task[]> {
    return this.prisma.task.findMany();
  }

  async getById(id: string): Promise<Task> {
    return this.prisma.task.findUnique({ where: { id: parseInt(id) } });
  }

  async addOne(taskAddDto: TaskAddDto): Promise<Task> {
    return this.prisma.task.create({
      data: {
        ...taskAddDto,
      },
    });
  }

  async updateOne(id: string, taskUpdateDto: TaskUpdateDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id: parseInt(id) },
      data: { ...taskUpdateDto },
    });
  }

  async deleteOne(id: string): Promise<Task> {
    return this.prisma.task.delete({
      where: { id: parseInt(id) },
    });
  }
}
