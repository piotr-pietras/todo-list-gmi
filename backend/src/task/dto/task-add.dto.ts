import { IsIn, IsNotEmpty, MinLength } from 'class-validator';
import { Task, TaskStatus } from '../interface/task.interface';

export class TaskAddDto
  implements Pick<Task, 'title' | 'description' | 'status'>
{
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @MinLength(4)
  @IsNotEmpty()
  description: string;

  @IsIn(Object.values(TaskStatus))
  status: string;
}
