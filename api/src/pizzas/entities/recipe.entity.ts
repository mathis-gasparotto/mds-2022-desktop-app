import { PrimaryGeneratedColumn } from 'typeorm'

export abstract class Recipe {
  @PrimaryGeneratedColumn()
  id: number
}
