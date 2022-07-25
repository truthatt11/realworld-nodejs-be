import { DataSource } from 'apollo-datasource';
import { PrismaClient } from '@prisma/client';
// import { User } from '../variable-types';
import { randomBytes, createHash } from 'crypto';

const prisma = new PrismaClient()

const getHash = (password: string, salt: string) => {
    return createHash('sha256').update(password+salt).digest('base64');
}

class LocalAPI extends DataSource {
    constructor() {
        super();
        console.log("[LocalAPI] constructor");
    }

    async getUser(userId: string) {
        console.log(`[GET_USER] userId: ${userId}`);
        const user = await prisma.user.findFirst({
            where: {
                token: userId
            }
        })
        if (user) {
            return {
                code: 200,
                success: true,
                message: "get_user",
                user: {
                    id: user.id.toString(),
                    email: user.email,
                    token: user.token,
                    username: user.username,
                    bio: user.bio,
                    image: user.image, 
                },
            };
        } else {
            return {
                code: 403,
                success: false,
                message: "user not found",
                user: null
            }
        }
    }
    async loginUser(email: string, password: string) {
        console.log(`[LOGIN_USER] email: ${email}, password: ${password}`);
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (user && user.salted) {
            const token = getHash(password, user.salted)
            if (token === user.token) {
                return {
                    code: 200,
                    success: true,
                    message: "",
                    user: {
                        id: user.id.toString(),
                        email,
                        token: token,
                        username: user.username,
                        bio: user.bio,
                        image: user.image
                    }
                };
            }
        }
    }
    async createUser(username: string, email: string, password: string) {
        console.log(`[CREATE_USER] username: ${username}, email: ${email}, password: ${password}`, 
            username, email, password);
        const existedUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        username: username
                    }, {
                        email: email
                    }
                ]
            }
        })
        if (existedUser) {
            return {
                code: 403,
                success: true,
                message: "user existed",
                user: null,
            };
        }
        const salt = randomBytes(16).toString('base64');
        const token = getHash(password, salt)
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                salted: salt,
                token: token,
            }
        })
        return {
            code: 200,
            success: true,
            message: "",
            user: {
                id: user.id.toString(),
                email: user.email,
                token: token,
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
