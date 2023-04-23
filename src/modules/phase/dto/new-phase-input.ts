import { Field, InputType } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class NewPhaseInput {
    @Field()
    @MaxLength(50)
    description: string;

    @Field({ nullable: true })
    status?: string;
}