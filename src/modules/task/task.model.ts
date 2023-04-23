import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Task {
	@Field(() => Int)
	id: number;

	@Field(() => String)
	description: String;

	@Field(() => String)
	status: String;
}