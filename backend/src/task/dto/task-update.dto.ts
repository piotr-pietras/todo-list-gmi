import { IsNotEmpty, IsIn } from 'class-validator';
import { Task } from '../interface/task.interface';
import { TaskStatus } from '../interface/task.interface';

export class TaskUpdateDto implements Pick<Task, 'status'> {
  @IsNotEmpty()
  @IsIn(Object.values(TaskStatus))
  status: string;
}
