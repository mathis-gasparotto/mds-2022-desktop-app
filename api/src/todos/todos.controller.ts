import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { TodosService } from './todos.service'
import { CreateTodoDto } from './dto/create-todo.dto'
import { UpdateTodoDto } from './dto/update-todo.dto'
import { ApiOperation } from '@nestjs/swagger'
import { ApiCreatedResponse } from '@nestjs/swagger'

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({ description: 'Create a Todo' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateTodoDto
  })
  @Post()
  create(@Body() createPizzaDto: CreateTodoDto) {
    return this.todosService.create(createPizzaDto)
  }

  @ApiOperation({ description: 'Get all Todos' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.'
  })
  @Get()
  findAll() {
    return this.todosService.findAll()
  }

  @ApiOperation({ description: 'Get a Todo' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todosService.findOne(+id)
  }

  @ApiOperation({ description: 'Update a Todo' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UpdateTodoDto
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(+id, updateTodoDto)
  }

  @ApiOperation({ description: 'Delete a Todo' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todosService.remove(+id)
  }
}
