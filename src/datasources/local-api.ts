import { DataSource } from 'apollo-datasource';
import { PrismaClient } from '@prisma/client';
// import { User } from '../variable-types';

const prisma = new PrismaClient()

class LocalAPI extends DataSource {
    constructor() {
        super();
        console.log("[LocalAPI] constructor");
    }

    async getUser() {
        console.log('[GET_USER]');
        const user = await prisma.user.findMany({})
        return {
            code: 200,
            success: true,
            message: "get_user",
            user: {
                id: user[0].id.toString(),
                email: user[0].email,
                token: user[0].token,
                username: user[0].username,
                bio: user[0].bio,
                image: user[0].image, 
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
        const user = await prisma.user.create({
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
                id: user.id.toString(),
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
