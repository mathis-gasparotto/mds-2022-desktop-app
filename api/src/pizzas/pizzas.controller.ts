import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { PizzasService } from './pizzas.service'
import { CreatePizzaDto } from './dto/create-pizza.dto'
import { UpdatePizzaDto } from './dto/update-pizza.dto'
import { ApiOperation } from '@nestjs/swagger'
import { ApiCreatedResponse } from '@nestjs/swagger'

@Controller('pizzas')
export class PizzasController {
  constructor(private readonly pizzasService: PizzasService) {}

  @ApiOperation({ description: 'Create a pizza' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreatePizzaDto
  })
  @Post()
  create(@Body() createPizzaDto: CreatePizzaDto) {
    return this.pizzasService.create(createPizzaDto)
  }

  @ApiOperation({ description: 'Get all pizzas' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get()
  findAll() {
    return this.pizzasService.findAll()
  }

  @ApiOperation({ description: 'Get a pizza' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pizzasService.findOne(+id)
  }

  @ApiOperation({ description: 'Update a pizza' })
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: UpdatePizzaDto
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePizzaDto: UpdatePizzaDto) {
    return this.pizzasService.update(+id, updatePizzaDto)
  }

  @ApiOperation({ description: 'Delete a pizza' })
  @ApiCreatedResponse({
    description: 'The record has been successfully deleted.'
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pizzasService.remove(+id)
  }
}
