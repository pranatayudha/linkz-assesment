import { EntityManager } from '@mikro-orm/core';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { RegisterResponseDto } from './dtos/register-response.dto';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    private readonly usersRepository: UsersRepository,
  ) {}

  async register(payload: RegisterRequestDto): Promise<RegisterResponseDto> {
    let user = await this.usersRepository.findOne({
      username: payload.username,
    });

    if (!user) {
      user = new UsersEntity();
      user.username = payload.username;
      user.password = bcrypt.hashSync(payload.password, 10);

      const errors = await validate(user);

      if (errors.length > 0) {
        throw new BadRequestException('Errors!');
      } else {
        await this.em.persistAndFlush(user);
      }
    } else {
      throw new BadRequestException('Already exists!');
    }

    user = await this.usersRepository.findOne({
      username: payload.username,
    });

    return {
      success: true,
      data: user,
      message: 'Success! You have registered.',
      code: HttpStatus.OK,
    };
  }
}
