import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly UserRepository: UsersRepository) {}

  create(data: CreateUserDto) {
    return this.UserRepository.create(data);
  }

  findAll() {
    return this.UserRepository.findAll();
  }

  async findOne(id: number): Promise<UserEntity> {
    const user = await this.UserRepository.findOne(id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    return user;
  }

  update(id: number, data: UpdateUserDto) {
    return this.UserRepository.update(id, data);
  }

  remove(id: number) {
    return this.UserRepository.remove(id);
  }
}
