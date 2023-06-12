import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo } from './entities/todo.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private data: Repository<Todo>) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.data.save(createTodoDto)
  }

  findAll(): Promise<Todo[]> {
    return this.data.find()
  }

  findOne(id: number): Promise<Todo> {
    return this.data.findOneByOrFail({ id }).catch(() => {
      throw new NotFoundException(id)
    })
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const done = await this.data.update(id, updateTodoDto)
    if (done.affected != 1) {
      throw new NotFoundException(id)
    }
    return this.findOne(id)
  }

  async remove(id: number): Promise<void> {
    const done = await this.data.delete(id)
    if (done.affected != 1) {
      throw new NotFoundException(id)
    }
  }
}
