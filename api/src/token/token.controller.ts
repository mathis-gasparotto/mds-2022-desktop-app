import { Controller } from '@nestjs/common'
import { Get } from '@nestjs/common'

@Controller('token')
export class TokenController {
  @Get()
  async signIn() {
    return { token: '123' }
  }
}
