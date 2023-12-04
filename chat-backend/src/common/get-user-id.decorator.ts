import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserPayload } from 'src/auth/auth.interface';

export const GetUserData = createParamDecorator(
  (_: undefined, context: ExecutionContext): UserPayload => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return { userId: user.sub, email: user.email };
  },
);
