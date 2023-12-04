import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserData = createParamDecorator(
  (_: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    return { userId: user.sub, email: user.email };
  },
);
