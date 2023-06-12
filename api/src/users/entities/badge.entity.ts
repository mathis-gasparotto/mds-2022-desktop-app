import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/entities/user.entity'
import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Badge {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 100 })
  title!: string

  @ApiProperty()
  @ManyToMany(() => User, (user) => user.badges)
  users!: User[]
}
