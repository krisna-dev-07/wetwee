
import 'next-auth'
declare module 'next-auth' {
    interface User {
        _id?: string;
        isVerified?: boolean;
        username?: string
    }
    interface Session {
        user: {

            _id?: string;
            isVerified?: boolean;
            username?: string
        } & DefaultSession['user']
    }
}
// alternative way to  declare
declare module 'next-auth/jwt' {
    interface JWT{

        _id ?: string;
        isVerified ?: boolean;
        username ?: string
    }
}
