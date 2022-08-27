import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from '../modules/admin/admin.service';

@Injectable()
export class AuthService {
  constructor(
    private adminService: AdminService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUserCredentials(email: string, password: string): Promise<any> {
    const admin = await this.adminService.findOneFromEmail(email);
    const isMatch = await this.adminService.checkPassword(
      password,
      admin.password,
    );

    if (admin && isMatch) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = admin;
      return result;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    const payload = { email: user.email, sub: user.userId };

    return {
      access_token: this.jwtTokenService.sign(payload, {
        secret: process.env.SECRET,
      }),
    };
  }
}
