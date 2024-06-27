import { Task } from '../interface/task.interface';

export class TaskAddDto implements Pick<Task, 'title' | 'description'> {
  title: string;
  description: string;
}
