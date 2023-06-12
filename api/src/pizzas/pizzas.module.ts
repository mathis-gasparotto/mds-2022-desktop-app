import { Module } from '@nestjs/common'
import { PizzasService } from './pizzas.service'
import { PizzasController } from './pizzas.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pizza } from './entities/pizza.entity'
import { Calzone } from './entities/calzone.entity'
import { Recipe } from './entities/recipe.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Calzone, Recipe])],
  controllers: [PizzasController],
  providers: [PizzasService]
})
export class PizzasModule {}
