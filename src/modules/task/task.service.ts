import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import Singleton from '../../singleton'
import { NewTaskInput } from './dto/new-task-input'

@Injectable()
export class TasksService {
    async createTask(data: NewTaskInput): Promise<Task> {
        const task: Task = Singleton.addTask(data);
        return task;
    }

    async setTaskStatus(data: NewTaskInput) {
        const task: Task = Singleton.setTaskStatus(data)
        return task;
    }
}