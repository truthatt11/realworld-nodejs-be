import { DataSource } from 'apollo-datasource';

class LocalAPI extends DataSource {
    constructor() {
        super();
    }

    getUser() {
        console.log('[GET_USER]');
        return;
    }
    loginUser(email: string, password: string) {
        console.log(`[LOGIN_USER] email: ${email}, password: ${password}`);
        return {
            code: 200,
            success: true,
            message: "",
            user: {
                email,
                token: "222222",
                username: "loginuser",
                bio: "hello graphql 2",
                image: "234.jpg"
            }
        };
    }
    createUser(username: string, email: string, password: string) {
        console.log(`[CREATE_USER] username: ${username}, email: ${email}, password: ${password}`, 
            username, email, password);
        return {
            code: 200,
            success: true,
            message: "",
            user: {
                email,
                token: "333333",
                username,
                bio: "hello createUser",
                image: "345.jpg"
            }
        };
    }
    updateUser(email: string, token: string, username: string, bio: string, image: string) {
        console.log(`[UPDATE_USER] email: ${email}, token: ${token}, username: ${username}, ` +
        `bio: ${bio}, image: ${image}`);
        return {
            code: 200,
            success: true,
            message: "",
            user: {
                email,
                token,
                username,
                bio,
                image,
            }
        };
    }
}

export = LocalAPI;
