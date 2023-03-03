import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<UserEntity> {
    return this.prisma.user.create({
      data,
      include: {
        Posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany({
      include: {
        Posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<UserEntity> {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        Posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async update(id: number, data: UpdateUserDto): Promise<UserEntity> {
    return this.prisma.user.update({
      where: { id },
      data,
      include: {
        Posts: {
          select: {
            title: true,
            createdAt: true,
          },
        },
      },
    });
  }

  async remove(id: number): Promise<UserEntity> {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
