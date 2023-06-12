import { Column, Entity, Index } from 'typeorm'
import { Recipe } from './recipe.entity'
import { ApiProperty } from '@nestjs/swagger'

export enum PizzaFlavor {
  Tomatoes = 'T',
  Cream = 'C'
}

@Entity()
export class Pizza extends Recipe {
  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 100 })
  name!: string

  @ApiProperty()
  @Index()
  @Column({ type: 'enum', enum: PizzaFlavor })
  flavor!: PizzaFlavor

  @ApiProperty()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created!: Date

  @ApiProperty()
  @Column({ default: false })
  speciality!: boolean

  @ApiProperty()
  @Column()
  price!: number

  @ApiProperty()
  @Column({ nullable: true })
  end?: Date
}
