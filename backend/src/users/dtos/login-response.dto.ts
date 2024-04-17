export class LoginResponseDto {
  success: boolean;
  data: {
    username: string;
    accessToken: string;
    latestLogin: Date;
  };
  message: string;
  code: number;
}
