export type JWTUserData = {
    email: string;
    userId: string;
};
export declare const AuthUser: (...dataOrPipes: any[]) => ParameterDecorator;
