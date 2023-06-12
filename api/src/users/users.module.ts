import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Article } from '../users/entities/article.entity'
import { UserData } from './entities/userData.entity'
import { Badge } from './entities/badge.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Article, UserData, Badge])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
