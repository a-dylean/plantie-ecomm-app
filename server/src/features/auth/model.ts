import { PrismaClient, Token, User } from "@prisma/client";
const prisma = new PrismaClient();

export type TokenCreationParams = Pick<Token, "userId" | "token">;

export class AuthModel {
    async createToken(data: TokenCreationParams): Promise<Token> {
        const {userId} = data;
        return await prisma.token.upsert({
            where: {
                userId: userId
            },
            update: {
                ...data 
            },
            create: {
                ...data
            }
        })
    }
}