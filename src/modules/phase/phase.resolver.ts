import { Args, Query, Resolver, Int, Mutation, ResolveField, Parent } from '@nestjs/graphql';
import { Phase } from './phase.model';
import { PhasesService } from './phase.service';
import { TasksService } from '../task/task.service';
import { NewPhaseInput } from './dto/new-phase-input';

@Resolver(of => Phase)
export class PhasesResolver {
    constructor(
        private phasesService: PhasesService,
        private tasksService: TasksService,
    ) { }

    @Query(returns => [Phase])
    async getProgress(): Promise<Phase[]> {
        return this.phasesService.getProgress();
    }

    @Mutation(returns => [Phase])
    async addPhase(
        @Args('newPhaseData') newPhaseData: NewPhaseInput,
    ): Promise<Phase[]> {
        const phase = await this.phasesService.create(newPhaseData);
        return phase;
    }
}
