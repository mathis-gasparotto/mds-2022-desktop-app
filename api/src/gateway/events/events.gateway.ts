import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway
} from '@nestjs/websockets'
import { Logger } from '@nestjs/common'

@WebSocketGateway()
export class EventsGateway {
  private static LOGGER: Logger = new Logger('Gateway')
  private static CHANNEL = 'message'

  @SubscribeMessage(EventsGateway.CHANNEL)
  handleMessage(@MessageBody() message: string) {
    EventsGateway.LOGGER.log(`Received message: ${message}`)
    return 'ok'
  }
}
