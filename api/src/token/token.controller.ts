import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

@Controller('token')
@ApiTags('token')
export class TokenController {
  @Get()
  async signIn() {
    return { token: '123' }
  }
}
