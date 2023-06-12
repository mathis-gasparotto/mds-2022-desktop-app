import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { Todo } from './entities/todo.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private data: Repository<Todo>) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todos = await this.findAll()
    // console.log(this.data.exist(createTodoDto))
    if (todos.filter((todo) => todo.title === createTodoDto.title).length > 0) {
      throw new HttpException(
        `${createTodoDto.title} is already exist`,
        HttpStatus.UNPROCESSABLE_ENTITY
      )
    }
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
    if ((await this.data.delete(id)).affected != 1) {
      throw new NotFoundException(`Not fount entity for id ${id}`)
    }
  }
}
