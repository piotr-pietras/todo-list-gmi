import { IsNumberString } from 'class-validator';

export class TaskIdQueryDto {
  @IsNumberString()
  id: string;
}
