import { createParamDecorator } from '@nestjs/common';
export type JWTUserData = {
  email: string;
  userId: string;
};
export const AuthUser = createParamDecorator((data, req) => {
  console.log(req);
  return { email: req.email, userId: req.userId } as JWTUserData;
});
