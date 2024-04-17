import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/get-user-decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { RegisterResponseDto } from './dtos/register-response.dto';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiBody({
    type: RegisterRequestDto,
    examples: {
      'John Doe': {
        value: {
          username: 'John Doe',
          password: 'password',
        } as RegisterRequestDto,
      },
    },
  })
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.usersService.register(registerRequestDto);
  }

  @Post('login')
  @ApiBody({
    type: LoginRequestDto,
    examples: {
      'John Doe': {
        value: {
          username: 'John Doe',
          password: 'password',
        } as LoginRequestDto,
      },
    },
  })
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<LoginResponseDto> {
    return this.usersService.login(loginRequestDto);
  }

  // * This request is made only for the example of using Authorization with Bearer token from JWT.
  @Get()
  @ApiBearerAuth('Authorization')
  @UseGuards(JwtAuthGuard)
  async get(@GetUser() user: UsersEntity) {
    return user;
  }
}
