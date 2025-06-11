import { Context } from "hono";
import { BaseController } from "./base.controller";

export class CategoryController extends BaseController{
    async getAll(c:Context) {
        const user = c.get('user');
        const categories = await this.prisma.category.findMany({
            where: {userId: user.id},
            include: {todos:true}
        });
        return this.success(c, categories)
    }

    async getOne(c:Context) {
        const user = c.get('user');
        const id = c.req.param('id');

        const category = await this.prisma.category.findFirst({
            where:{ id, userId: user.id},
            include:{todos: true}
        });
        if(!category){
            return this.notFound(c, 'Category not found');
        }

        return this.success(c, category)
    }
    async create(c: Context) {
        const user = c.get('user');
        const data = c.req.valid('json');

        const category = await this.prisma.category.create({
            data: {
                ...data,
                userId: user.id
            }
        });
        return this.success(c, category, 201);
    }
    async update(c: Context) {
        const user = c.get('user');
        const id = c.req.param('id');
        const data = c.req.valid('json');

        const category = await this.prisma.category.findFirst({
            where: {id, userId: user.id }
        });

        if(!category) {
            return this.notFound(c, 'Category not found');
        }

        const updatedCategory = await this.prisma.category.update({
            where: {id},
            data,
        });
        return this.success(c, updatedCategory);
    }
    async delete( c:Context) {
        const user = c.get('user');
        const id = c.req.param('id');

        const category = await this.prisma.category.findFirst({
            where:{id, userId: user.id }
        });
        if(!category){
            return this.notFound(c, 'Category not found');
        }

        await this.prisma.category.delete({
            where: {id}
        });
        return this.success(c, {message: 'Category deleted successsfully'})
    }
}