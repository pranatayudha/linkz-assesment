import { MikroOrmModule } from '@mikro-orm/nestjs';
import {
  EntityCaseNamingStrategy,
  PostgreSqlDriver,
} from '@mikro-orm/postgresql';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        entities: ['./dist/**/*.entity.js'],
        entitiesTs: ['./src/**/*.entity.ts'],
        host: configService.get('POSTGRES_HOST'),
        port: parseInt(<string>configService.get('POSTGRES_PORT')),
        dbName: <string>configService.get('POSTGRES_DATABASE'),
        password: <string>configService.get('POSTGRES_PASSWORD'),
        schema: 'public',
        driver: PostgreSqlDriver,
        allowGlobalContext: true,
        namingStrategy: EntityCaseNamingStrategy,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
