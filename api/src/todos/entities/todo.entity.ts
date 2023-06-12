import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number

  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 191 })
  title!: string

  @ApiProperty()
  @Column({ type: 'longtext' })
  content!: string

  @ApiProperty()
  @Column({ type: 'datetime' })
  datetime!: Date

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  important!: boolean

  @ApiProperty()
  @Column({ type: 'boolean', default: false })
  completed!: boolean
}
