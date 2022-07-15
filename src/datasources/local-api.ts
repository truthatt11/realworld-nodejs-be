import { DataSource } from 'apollo-datasource';
import { PrismaClient } from '@prisma/client';
import { User } from '../variable-types';

const prisma = new PrismaClient()

class LocalAPI extends DataSource {
    constructor() {
        super();
        console.log("[LocalAPI] constructor");
    }

    async getUser() {
        console.log('[GET_USER]');
        // prisma.user.query({
        //     data: {

        //     }
        // })
        return {
            code: 200,
            success: true,
            message: "get_user",
            user: {
                email: "email.com",
                token: "token",
                username: "usernmae",
                bio: "hello world",
                image: "img.jpg", 
            },
        };
    }
    async loginUser(email: string, password: string) {
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
    async createUser(username: string, email: string, password: string) {
        console.log(`[CREATE_USER] username: ${username}, email: ${email}, password: ${password}`, 
            username, email, password);
        const user: User = await prisma.user.create({
            data: {
                username: username,
                email: email
            }
        })
        return {
            code: 200,
            success: true,
            message: "",
            user: {
                email: user.email,
                token: user.token,
                username: user.username,
                bio: user.bio,
                image: user.image
            }
        };
    }
    async updateUser(email: string, token: string, username: string, bio: string, image: string) {
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
