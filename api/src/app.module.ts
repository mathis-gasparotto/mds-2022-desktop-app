import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UsersModule } from './users/users.module'
import { TokenController } from './token/token.controller'
import { PizzasModule } from './pizzas/pizzas.module'
import { EventsGateway } from './gateway/events/events.gateway'
import { TodosModule } from './todos/todos.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306, // default port for postgres
      username: 'root',
      password: '',
      database: 'first_desktop_app',
      autoLoadEntities: true,
      synchronize: true
    }),
    UsersModule,
    PizzasModule,
    TodosModule
  ],
  controllers: [AppController, TokenController],
  providers: [AppService, EventsGateway]
})
export class AppModule {}
