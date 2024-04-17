import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersEntity } from './users.entity';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: 'linkz-assesment-api',
      signOptions: { expiresIn: '1h' },
    }),
    MikroOrmModule.forFeature({ entities: [UsersEntity] }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
