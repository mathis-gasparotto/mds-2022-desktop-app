import { Column, Entity, Index } from 'typeorm'
import { Recipe } from './recipe.entity'
import { ApiProperty } from '@nestjs/swagger'

export enum Calzonelavor {
  Tomatoes = 'T',
  Cream = 'C'
}

@Entity()
export class Calzone extends Recipe {
  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 100 })
  name!: string

  @ApiProperty()
  @Index()
  @Column({ type: 'enum', enum: Calzonelavor })
  flavor!: Calzonelavor

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
