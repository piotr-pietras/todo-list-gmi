import { IsNotEmpty, MinLength } from 'class-validator';
import { Task } from '../interface/task.interface';

export class TaskAddDto implements Pick<Task, 'title' | 'description'> {
  @MinLength(4)
  @IsNotEmpty()
  title: string;

  @MinLength(4)
  @IsNotEmpty()
  description: string;
}
