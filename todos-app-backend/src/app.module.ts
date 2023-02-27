import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { mongodbConnectionUrl } from './config';

@Module({
  imports: [MongooseModule.forRoot(mongodbConnectionUrl), TodosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
