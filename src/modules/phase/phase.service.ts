import { Injectable } from '@nestjs/common';
import { Phase } from './phase.model';
import Singleton from '../../singleton'
import { NewPhaseInput } from './dto/new-phase-input';

@Injectable()
export class PhasesService {

    async create(data: NewPhaseInput): Promise<Phase[]> {
        const phases: Phase[] = Singleton.addPhase(data);
        return phases;
    }

    async getProgress(): Promise<Phase[]> {
        const phases: Phase[] = Singleton.getProgress();
        return phases;
    }
}