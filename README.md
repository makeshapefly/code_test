
# Description

GraphQL backend for the <b>My Start-up Progress Application</b>.

## Installation
After you've pulled down the code from the repository, install the required dependencies.
You can use Yarn for this, so make sure it's installed.

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn start


```

# Playbook
The application fully implements the requirements in the brief.

By default, the application launches with some pre-defined phases and tasks as illustrated in the brief. Comment out this section in the code to launch with no data.

Phases and Tasks can be added through the API, although there is no implementation that enables either to be deleted, only an API for changing the status of a task. The API satisfies the brief in the minimum way - think of it as a MVP.

Briefly, the API acommodates unlimited phases, with each phase housing an unlimited number of tasks.


### <b>GraphQL Playbook</b>
You can use the in-built GraphQL Playbook at http://localhost:3000/graphql to send queries and mutations to the application.

### <b>Get Progress</b>
The all important query to obtain overall progress. 

This will return all phases and associated tasks with a status for tasks and a 
derived status for Phases.

```bash
# Get Progress
{
  getProgress{
    id,
    description,
    status,
    tasks {
      id,
      description,
      status
    }
  }
}

```


### <b>Create a Phase</b>
Although the application launches with three phases, you can add further phases with the following GraphQL mutation.

New phases appear after existing phases for the purposes of this simple illustration.

```bash
# Add Phase
mutation {
  addPhase(newPhaseData: {description: "Party Hard"}) {
		id,
		description,
		status
  }
}

```

### <b>Create a Task<b>
"Every phase can have an unlimited amount of tasks".

<b>TODO</b> - implement appropriate error handling. Although the application gracefully handles a <u>phaseId</u> that doesn't exist, it doesn't feedback to the sender.

```bash
# Add Task - specify the phase (phaseId) that this task belongs to
mutation {
  addTask(newTaskData: {description: "Buy party food", phaseId: 4}) {
		id,
		description,
		status
  }
}

```

### <b>Set Task Status</b>
Used to mark a task as completed.

Can also be used to reopen a task.

Throws a GraphQL error if the task cannot be completed.

<b>TODO</b> - a better implementation would perhaps be to send a boolean such as closeTask to avoid the need to write text that could be error prone.

<b>TODO</b> - implement appropriate error handling. Although the application gracefully handles, for e.g., phaseId doesn't exist, it doesn't feedback to the sender.

```bash
# Set Task Status - Specify the exact task via phaseId and id (taskId)
mutation {
  setTaskStatus(taskInputData: {phaseId: 3, id: 3, status: "completed"}) {
		id,
		description,
		status
  }
}

```

### <b>Reopen a Task</b>

```bash
# Set Task Status - Specify the exact task via phaseId and id (taskId)
mutation {
  setTaskStatus(taskInputData: {phaseId: 3, id: 3, status: "open"}) {
		id,
		description,
		status
  }
}

```
# Tests
There is a single illustrative jest test included for Add Phase, however I reached the time allocated limit before adding a more comprehensive suite.

```bash
yarn test

```

# Improvements
- error messaging for failed operations to be implemented properly.

- the set task status call requires a manual string - not so good, refactor.

- give Singleton a meaningful name (used here for illustration that it's a singleton).


# Discussion
- Test suite. Business logic largely in the singleton which would benefit from unit test coverage. 
TDD might be helpful, but time spent testing and mocking the layers of a GraphQL\REST application might be better spent elsewhere ??

- Storing of Phase status - I thought about this for a bit and went with an approach that derives the statuses on the fly. This fits well with an in-memory model for this exercise, but for longer term solution might be better to store this. Would be an interesting discussion.

# Data Schema

A simple data schema, defined in a relational way, can be found at /data_schema.png

This could easily be implemented in a document store such as MongoDB in-lieu of a relational DB.

It would be a point of discussion as to whether Phase status is derived or stored.

