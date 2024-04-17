import { UsersEntity } from '../users.entity';

export class LoginResponseDto {
  success: boolean;
  data: UsersEntity;
  message: string;
  code: number;
}
