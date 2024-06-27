import { Task, TaskStatus } from '../interface/task.interface';

export class TaskUpdateDto implements Pick<Task, 'status'> {
  status: TaskStatus;
}
