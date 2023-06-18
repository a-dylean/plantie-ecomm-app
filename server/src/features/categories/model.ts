import { Category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryModel {
    async getAll(): Promise<Category[]> {
        return await prisma.category.findMany()
    }
}