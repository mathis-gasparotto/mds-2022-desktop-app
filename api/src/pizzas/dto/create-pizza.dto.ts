import { IsNotEmpty, Min } from 'class-validator'
import { PizzaFlavor } from '../entities/pizza.entity'

export class CreatePizzaDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  flavor: PizzaFlavor

  @IsNotEmpty()
  speciality: boolean

  @IsNotEmpty()
  @Min(0)
  price: number

  end?: Date
}
