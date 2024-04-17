import { ForbiddenException, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'linkz-assesment-api',
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.usersService.getUser(payload);

    if (!user) {
      throw new ForbiddenException('Invalid Token!');
    }

    return user;
  }
}
