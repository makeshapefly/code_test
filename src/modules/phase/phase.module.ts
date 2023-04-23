import { Module, forwardRef } from '@nestjs/common';
import { PhasesResolver } from './phase.resolver';
import { PhasesService } from './phase.service';
import { TasksModule } from '../task/task.module';
import { TasksService } from '../task/task.service';

@Module({
    imports: [forwardRef(() => TasksModule)],
    providers: [PhasesResolver, PhasesService, TasksService],
    exports: [PhasesResolver, PhasesService],
})
export class PhasesModule { }