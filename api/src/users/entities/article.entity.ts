import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Article {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 100 })
  title!: string

  @ApiProperty()
  @Column({ type: 'longtext' })
  content!: string

  @ApiProperty()
  @ManyToOne(() => User, (user) => user.articles)
  author!: User
}
