import { BadRequestException, Injectable } from '@nestjs/common';
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
    try {
      const res = await this.prisma.task.findUnique({
        where: { id: parseInt(id) },
      });
      if (!res) {
        throw new BadRequestException('Bad request', {
          description: 'Record does not exist.',
        });
      }
      return res;
    } catch (error) {
      throw new BadRequestException('Bad request', {
        cause: error,
        description: error.meta.cause,
      });
    }
  }

  async addOne(taskAddDto: TaskAddDto): Promise<Task> {
    try {
      const res = await this.prisma.task.create({
        data: {
          ...taskAddDto,
        },
      });
      return res;
    } catch (error) {
      throw new BadRequestException('Bad request', {
        cause: error,
        description: error.meta.cause,
      });
    }
  }

  async updateOne(id: string, taskUpdateDto: TaskUpdateDto): Promise<Task> {
    try {
      const result = await this.prisma.task.update({
        where: { id: parseInt(id) },
        data: { ...taskUpdateDto },
      });
      return result;
    } catch (error) {
      throw new BadRequestException('Bad request', {
        cause: error,
        description: error.meta.cause,
      });
    }
  }

  async deleteOne(id: string): Promise<Task> {
    try {
      const result = await this.prisma.task.delete({
        where: { id: parseInt(id) },
      });
      return result;
    } catch (error) {
      throw new BadRequestException('Bad request', {
        cause: error,
        description: error.meta.cause,
      });
    }
  }
}
