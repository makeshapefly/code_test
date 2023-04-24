import Singleton from '../src/singleton'
import { NewPhaseInput } from '../src/modules/phase/dto/new-phase-input';
import { Phase } from '../src/modules/phase/phase.model';

describe("addPhase function", () => {
    test("it should return the Phase", () => {
    
      const input: NewPhaseInput = new NewPhaseInput()
      input.description = "New Phase"
      input.status = "open"
  
      expect(Singleton.addPhase(input).length).toBe(4) 
    });
  });
