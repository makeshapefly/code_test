import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Task } from '../task/task.model';

@ObjectType()
export class Phase {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	description: String;

	@Field(() => String)
	status?: String;

    @Field(() => [Task], {
        nullable: true
    })
	tasks?: Task[];
}