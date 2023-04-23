import { NewPhaseInput } from "./modules/phase/dto/new-phase-input";
import { NewTaskInput } from "./modules/task/dto/new-task-input";
import { Phase } from "./modules/phase/phase.model";
import { Task } from "./modules/task/task.model"
import { GraphQLError } from "graphql";

//comment out if you want to start with no phases
let phases: Phase[] = [
    { "id": 1, "description": "Foundation" },
    { "id": 2, "description": "Discovery" },
    { "id": 3, "description": "Delivery", }
];

let tasks: Map<number, Task[]> = new Map()
/* comment out this section for no pre-populated tasks */
tasks.set(1, [
    { "id": 1, "description": "Set up virtual office", "status": "completed" },
    { "id": 2, "description": "Set mission and vision", "status": "completed" },
    { "id": 2, "description": "Select business name", "status": "completed" },
    { "id": 2, "description": "Buy domains", "status": "completed" }
]);
tasks.set(2, [
    { "id": 1, "description": "Create roadmap", "status": "completed" },
    { "id": 2, "description": "Competitor Analysis", "status": "open" }
]);
tasks.set(3, [
    { "id": 1, "description": "Release marketing website", "status": "open" },
    { "id": 1, "description": "Release MVP", "status": "open" }
]);

enum TaskAndPhaseStatus {
    open,
    completed,
}

class Singleton {
    private static instance: Singleton;

    private constructor() { }

    public static getInstance(): Singleton {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    public addPhase(newPhaseData: NewPhaseInput) {
        let phase: Phase = new Phase();
        phase.description = newPhaseData.description;
        phase.status = TaskAndPhaseStatus[TaskAndPhaseStatus.open]
        phase.id = this.getPhasesSize() + 1
        phases.push(phase);
        return phases;
    }

    public getPhasesSize() {
        return phases.length;
    }

    public addTask(newTaskData: NewTaskInput) {
        const phaseNo = newTaskData.phaseId;
        let taskArray: Task[] = tasks.get(phaseNo);
        if (taskArray == null) {
            taskArray = [];
        }
        let task: Task = new Task();
        task.id = taskArray.length + 1;
        task.description = newTaskData.description;
        task.status = TaskAndPhaseStatus[TaskAndPhaseStatus.open]
        taskArray.push(task);
        tasks.set(phaseNo, taskArray);

        phases.forEach((phase: Phase) => {
            if (phase.id === phaseNo) {
                phase.tasks = taskArray;
            }
        })

        return task;
    }

    /*
        Called by non-admin user to set the status of a task.
        Will only be allowed if the previous phase is complete.
    */
    public setTaskStatus(taskInputData: NewTaskInput) {
        let calculatedPhases = this.getProgress()
        const filtered = calculatedPhases.filter(phase => phase.status == TaskAndPhaseStatus[TaskAndPhaseStatus.completed])
        if (taskInputData.phaseId - filtered.length > 1) {
            //don't allow this task to be completed
            throw new GraphQLError('You cannot complete this task quite yet.', {
                extensions: {
                    code: 'FORBIDDEN',
                },
            });
        }

        let taskArray: Task[] = tasks.get(taskInputData.phaseId);
        taskArray.forEach((task: Task) => {
            if (task.id === taskInputData.id) {
                task.status = taskInputData.status;
            }
        })
        return taskArray[0];
    }

    /*
        The method that would be called by a non-admin user to get the overall progress.
        Derives a collection of phases and tasks from memory storage
        and sets the status of phases based on task statuses>
        - if all tasks are complete then phase is completed.
        - if a phase has no tasks then it is marked open (pending tasks).
    */
    public getProgress() {
        phases.forEach((phase: Phase) => {
            let taskArray: Task[] = tasks.get(phase.id);
            if (taskArray == null) {
                phase.status = TaskAndPhaseStatus[TaskAndPhaseStatus.open];
                phase.tasks = [];
            } else {
                let tasksComplete = true;
                phase.tasks = taskArray
                taskArray.forEach((task: Task) => {
                    if (task.status != TaskAndPhaseStatus[TaskAndPhaseStatus.completed]) {
                        tasksComplete = false;
                    }
                })
                if (!tasksComplete) {
                    phase.status = TaskAndPhaseStatus[TaskAndPhaseStatus.open];
                } else {
                    phase.status = TaskAndPhaseStatus[TaskAndPhaseStatus.completed];
                }
            }
        })
        return phases;
    }

}

export default Singleton.getInstance()
