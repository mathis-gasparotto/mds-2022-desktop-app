import { Module } from '@nestjs/common'
import { TodosService } from './todos.service'
import { TodosController } from './todos.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Todo } from './entities/todo.entity'
import { TodosCountsController } from './todosCount.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController, TodosCountsController],
  providers: [TodosService]
})
export class TodosModule {}
