import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: false,
    });
  }

  async validate(email: string, password: string): Promise<any> {
    try {
      const admin = await this.authService.validateUserCredentials(
        email,
        password,
      );

      if (!admin) {
        throw new UnauthorizedException();
      }

      return admin;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
