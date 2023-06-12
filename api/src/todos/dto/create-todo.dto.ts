import { IsNotEmpty } from 'class-validator'

export class CreateTodoDto {
  @IsNotEmpty()
  title: string

  @IsNotEmpty()
  content: string

  @IsNotEmpty()
  datetime: Date

  @IsNotEmpty()
  important: boolean

  @IsNotEmpty()
  completed: boolean
}
