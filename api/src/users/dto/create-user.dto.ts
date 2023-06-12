import { IsEmail, IsNotEmpty, IsEnum } from 'class-validator'
import { UserRole } from '../entities/user.entity'

export class CreateUserDto {
  @IsEmail()
  email!: string

  @IsNotEmpty()
  name!: string

  @IsNotEmpty()
  password!: string

  @IsEnum(UserRole)
  role!: UserRole
}
