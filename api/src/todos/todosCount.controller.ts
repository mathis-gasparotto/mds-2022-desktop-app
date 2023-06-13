import { Controller, Get } from '@nestjs/common'
import { TodosService } from './todos.service'
import { ApiOperation, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'

@Controller('todos')
@ApiTags('todos')
export class TodosCountsController {
  constructor(private readonly todosService: TodosService) {}

  @ApiOperation({ description: 'Get Todos Count' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get('count')
  findCount() {
    return this.todosService.getCount()
  }

  @ApiOperation({ description: 'Get Completed Todos Count' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get('completed/count')
  findCompetedCount() {
    return this.todosService.getCompletedCount()
  }

  @ApiOperation({ description: 'Get Uncompleted Todos Count' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get('uncompleted/count')
  findUncompetedCount() {
    return this.todosService.getUncompletedCount()
  }

  @ApiOperation({ description: 'Get Important Todos Count' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get('important/count')
  findImportantCount() {
    return this.todosService.getImportantCount()
  }

  @ApiOperation({ description: 'Get Not Important Todos Count' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get('not-important/count')
  findNotImportantCount() {
    return this.todosService.getNotImportantCount()
  }

  @ApiOperation({ description: 'Get Not Important Todos Count' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get('past/count')
  findPastCount() {
    return this.todosService.getPastCount()
  }

  @ApiOperation({ description: 'Get Not Important Todos Count' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get('today/count')
  findTodayCount() {
    return this.todosService.getTodayCount()
  }

  @ApiOperation({ description: 'Get Not Important Todos Count' })
  @ApiCreatedResponse({
    description: 'The record has been successfully got.'
  })
  @Get('futur/count')
  findFuturCount() {
    return this.todosService.getFuturCount()
  }
}
