import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable
} from 'typeorm'
import { Article } from './article.entity'
import { UserData } from './userData.entity'
import { Badge } from './badge.entity'
import { ApiProperty } from '@nestjs/swagger'

export enum UserRole {
  ADMIN = 'A',
  MEMBER = 'M',
  GUEST = 'G'
}

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Index({ unique: true })
  @Column({ length: 191 })
  email: string

  @ApiProperty()
  @Exclude()
  @Column({ length: 100 })
  hash!: string

  @ApiProperty()
  @Column({ length: 200 })
  name: string

  @ApiProperty()
  @Index()
  @Column({ type: 'enum', enum: UserRole, default: UserRole.GUEST })
  role!: UserRole

  @ApiProperty()
  @OneToMany(() => Article, (article) => article.author)
  articles!: Article[]

  @ApiProperty()
  @OneToOne(() => UserData, (data) => data.user)
  @JoinColumn()
  data!: UserData

  @ApiProperty()
  @ManyToMany(() => Badge, (badge) => badge.users)
  @JoinTable()
  badges!: Badge[]
}
