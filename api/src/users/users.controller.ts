import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { NotFoundException } from '@nestjs/common'
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ description: 'Create a user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: CreateUserDto
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @ApiOperation({ description: 'Get all users' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @ApiOperation({ description: 'Get a user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id)
  }

  @ApiOperation({ description: 'Update a user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: UpdateUserDto
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto)
  }

  @ApiOperation({ description: 'Delete a user' })
  @ApiCreatedResponse({
    description: 'The record has been successfully deleted.'
  })
  @Delete(':id')
  remove(@Param('id') id: string, @Res() res) {
    return this.usersService.remove(+id).then((done) => {
      if (done) {
        return res.status(200).send()
      }
      throw new NotFoundException()
    })
  }
}
