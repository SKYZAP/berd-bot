import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  getRequest(context: ExecutionContext) {
    const isGqlContext = GqlExecutionContext.create(context);

    if (!isGqlContext) {
      return context.switchToHttp().getRequest();
    }

    const { req } = isGqlContext.getContext();
    const { input } = isGqlContext.getArgs();
    req.body = input;
    return req;
  }

  handleRequest(err, user, info, context, status) {
    const isGqlContext = GqlExecutionContext.create(context);
    const request =
      isGqlContext != undefined
        ? isGqlContext.getContext().req
        : context.switchToHttp().getRequest();

    const { email, password } = request.body;
    if (err || !user) {
      if (!email) {
        throw new HttpException(
          { message: 'Email not provided' },
          HttpStatus.OK,
        );
      } else if (!password) {
        throw new HttpException(
          { message: 'Password not provided' },
          HttpStatus.OK,
        );
      } else {
        throw err || new UnauthorizedException();
      }
    }

    return user;
  }
}
