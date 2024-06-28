import { IsNotEmpty, IsIn, MinLength } from 'class-validator';
import { Task } from '../interface/task.interface';
import { TaskStatus } from '../interface/task.interface';

export class TaskUpdateDto
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
