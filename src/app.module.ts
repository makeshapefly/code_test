import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  ApolloDriver,
  ApolloDriverConfig
} from '@nestjs/apollo';
import { PhasesModule } from './modules/phase/phase.module';
import { TasksModule } from './modules/task/task.module';

@Module({
  imports: [
    PhasesModule,
    TasksModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,

      // to generate schema from @ObjectType() class
      autoSchemaFile: true,
    }),
  ],
})
export class AppModule { }
