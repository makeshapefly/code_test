import { Module } from '@nestjs/common';
import { TasksResolver } from './task.resolver';
import { TasksService } from './task.service';

@Module({
  providers: [TasksResolver, TasksService],
})
export class TasksModule {}