import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), UserModule],
  providers: [TaskService],
  controllers: [TasksController],
})
export class TaskModule {}
