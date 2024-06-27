export enum TaskStatus {
  todo = 'TO_DO',
  inProgress = 'IN_PROGRESS',
  done = 'DONE',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  timestamp: Date;
}
