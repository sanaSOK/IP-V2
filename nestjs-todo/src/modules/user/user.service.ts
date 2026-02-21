import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  getUser(username: string) {
    return this.usersRepo.findOne({ where: { username }, relations: ['tasks'] });
  }

  createUser(userData: Partial<User>) {
    const user = this.usersRepo.create(userData);
    return this.usersRepo.save(user);
  }

  async updateUser(updateData: { username: string; email: string; password: string }) {
    const { username, ...rest } = updateData;
    const user = await this.usersRepo.findOne({ where: { username } });
    if (!user) return null;
    Object.assign(user, rest);
    return this.usersRepo.save(user);
  }

  deleteUser(username: string) {
    return this.usersRepo.delete({ username });
  }
}