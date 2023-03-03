import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostsRepository } from './repositories/posts.repository';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsService {
  constructor(private readonly postRepository: PostsRepository) {}
  create(data: CreatePostDto) {
    return this.postRepository.create(data);
  }

  findAll() {
    return this.postRepository.findAll();
  }

  async findOne(id: number) {
    const user = await this.postRepository.findOne(id);

    if (!user) {
      throw new NotFoundError('Usuário não encontrado!');
    }

    return user;
  }

  update(id: number, data: UpdatePostDto) {
    return this.postRepository.update(id, data);
  }

  remove(id: number) {
    return this.postRepository.remove(id);
  }
}
