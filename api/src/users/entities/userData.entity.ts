import { ApiProperty } from '@nestjs/swagger'
import { User } from 'src/users/entities/user.entity'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class UserData {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty()
  @Column()
  birthday!: Date

  @ApiProperty()
  @OneToOne(() => User, (user) => user.data)
  user!: User
}
