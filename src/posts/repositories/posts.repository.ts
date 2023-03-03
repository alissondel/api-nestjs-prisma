import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto } from '../dto/create-post.dto';
import { PostEntity } from '../entities/post.entity';
import { UpdatePostDto } from '../dto/update-post.dto';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';

@Injectable()
export class PostsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreatePostDto): Promise<PostEntity> {
    const { authorEmail } = data;

    delete data.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: {
        email: authorEmail,
      },
    });

    if (!user) {
      throw new NotFoundError('Author not found!');
    }

    const dataPrisma: Prisma.PostCreateInput = {
      ...data,
      author: {
        connect: { email: authorEmail },
      },
    };

    return this.prisma.post.create({ data: dataPrisma });
  }

  async findAll(): Promise<PostEntity[]> {
    return this.prisma.post.findMany({
      include: {
        author: true,
      },
    });
  }

  async findOne(id: number): Promise<PostEntity> {
    return this.prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdatePostDto): Promise<PostEntity> {
    const { authorEmail } = data;

    if (!authorEmail) {
      return this.prisma.post.update({
        data,
        where: { id },
      });
    }

    delete data.authorEmail;

    const user = await this.prisma.user.findUnique({
      where: { email: authorEmail },
    });

    if (!user) {
      throw new NotFoundError('Author not found!');
    }

    const dataPrisma: Prisma.PostUpdateInput = {
      ...data,
      author: {
        connect: { email: authorEmail },
      },
    };

    return this.prisma.post.update({
      where: { id },
      data: dataPrisma,
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<PostEntity> {
    return this.prisma.post.delete({
      where: { id },
    });
  }
}
