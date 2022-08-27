import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const isGqlContext = GqlExecutionContext.create(context);

    if (!isGqlContext) {
      return context.switchToHttp().getRequest();
    }

    return isGqlContext.getContext().req;
  }
}
