import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id!: number

  @Index({ unique: true })
  @Column({ length: 191 })
  title!: string

  @Column({ type: 'longtext' })
  content!: string

  @Column({ type: 'datetime' })
  datetime!: Date

  @Column({ type: 'boolean', default: false })
  important!: boolean

  @Column({ type: 'boolean', default: false })
  completed!: boolean
}
