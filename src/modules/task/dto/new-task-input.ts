import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewTaskInput {
  @Field({ nullable: true})
  id: number;

  @Field({ nullable: true})
  @MaxLength(50)
  description: string;

  @Field({ nullable: true})
  status?: string;

  @Field(() => Number, {
    nullable: false,
    description: 'Phase this task belongs to',
  })
  phaseId: number;
}