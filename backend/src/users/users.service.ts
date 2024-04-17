import { EntityManager, wrap } from '@mikro-orm/core';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { validate } from 'class-validator';
import * as uuid from 'uuid';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { RegisterResponseDto } from './dtos/register-response.dto';
import { UsersEntity } from './users.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly em: EntityManager,
    private readonly jwtService: JwtService,
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
      message: 'Success! You have registered.',
      code: HttpStatus.OK,
    };
  }

  async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
    let user = await this.usersRepository.findOne({
      username: payload.username,
    });

    let jwtSignPayload = null;

    if (!user) {
      throw new NotFoundException('User not found!');
    } else {
      const checkPassword = bcrypt.compareSync(payload.password, user.password);

      if (!checkPassword) {
        throw new NotFoundException('User not found!');
      } else {
        const updateUser = new UsersEntity();
        updateUser.username = user.username;
        updateUser.password = user.password;
        updateUser.latestLogin = new Date();
        updateUser.uid = uuid.v4();

        wrap(user).assign(updateUser);
        await this.em.flush();

        jwtSignPayload = {
          username: updateUser.username,
          uid: updateUser.uid,
          latestLogin: updateUser.latestLogin,
        };
      }
    }

    const accessToken = this.jwtService.sign(jwtSignPayload, {
      expiresIn: '1h',
      secret: 'linkz-assesment-api',
    });

    return {
      success: true,
      data: {
        username: user.username,
        accessToken,
        latestLogin: user.latestLogin,
      },
      message: 'Success! You are logged in.',
      code: HttpStatus.OK,
    };
  }

  async getUser(payload: any): Promise<UsersEntity> {
    return this.usersRepository.findOne({
      username: payload.username,
      latestLogin: payload.latestLogin,
    });
  }
}
