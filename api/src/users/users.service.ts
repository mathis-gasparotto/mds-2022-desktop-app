import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import * as bcrypt from 'bcryptjs'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { NotFoundException } from '@nestjs/common'

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private data: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = process.env['HASH_SALT'] || 12
    const hash = await bcrypt.hash(createUserDto.password, salt)
    return this.data.save({
      ...createUserDto,
      hash: hash
    })
  }

  findAll(): Promise<User[]> {
    return this.data.find()
  }

  findOne(id: number): Promise<User> {
    return this.data.findOneBy({ id })
  }

  findOneByEmail(email: string): Promise<User> {
    return this.data.findOneBy({ email })
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    let done
    if (updateUserDto.password !== undefined) {
      const salt = process.env['HASH_SALT'] || 12
      const hash = await bcrypt.hash(updateUserDto.password, salt)
      done = await this.data.update(id, { ...updateUserDto, hash: hash })
    } else {
      done = await this.data.update(id, { ...updateUserDto })
    }
    if (done.affected === 1) {
      return this.findOne(id)
    }
    throw new NotFoundException()
  }

  async remove(id: number): Promise<boolean> {
    const done = await this.data.delete(id)
    return done.affected === 1
  }
}
