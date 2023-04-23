import { Args, Query, Resolver, Int, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Task } from './task.model';
import { NewTaskInput } from './dto/new-task-input';
import { TasksService } from './task.service';

@Resolver(of => Task)
export class TasksResolver {
    constructor(
        private tasksService: TasksService,
    ) { }

    @Mutation(returns => Task)
    async addTask(
        @Args('newTaskData') newTaskData: NewTaskInput,
    ): Promise<Task> {
        const task = await this.tasksService.createTask(newTaskData);
        return task;
    }

    @Mutation(returns => Task)
    async setTaskStatus(
        @Args('taskInputData') taskInputData: NewTaskInput,
    ): Promise<Task> {
        const task = await this.tasksService.setTaskStatus(taskInputData);
        return task;
    }
}