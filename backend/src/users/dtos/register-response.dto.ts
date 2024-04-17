import { UsersEntity } from '../users.entity';

export class RegisterResponseDto {
  success: boolean;
  data: UsersEntity;
  message: string;
  code: number;
}
