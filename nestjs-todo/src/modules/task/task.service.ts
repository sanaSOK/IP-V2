import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from '../user/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepo: Repository<Task>,
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findAll() {
    return this.tasksRepo.find({ relations: ['user'] });
  }

  getTask(id: string) {
    const taskId = Number(id);
    return this.tasksRepo.findOne({ where: { id: taskId }, relations: ['user'] });
  }

  async createTask(data: Partial<Task> & { userId?: number }) {
    const task = this.tasksRepo.create({
      name: data.name,
      description: data.description,
    } as Partial<Task>);

    if (data.userId) {
      const user = await this.usersRepo.findOne({ where: { id: data.userId } });
      if (!user) throw new NotFoundException('User not found');
      task.user = user;
    }

    return this.tasksRepo.save(task);
  }

  async updateTask(id: string, updateData: Partial<Task>) {
    const taskId = Number(id);
    await this.tasksRepo.update(taskId, updateData);
    return this.getTask(String(taskId));
  }

  deleteTask(id: string) {
    const taskId = Number(id);
    return this.tasksRepo.delete(taskId);
  }
}