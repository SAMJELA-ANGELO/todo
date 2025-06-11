import { Context } from "hono";
import { BaseController } from "./base.controller";

export class TodoController extends BaseController{
    async getAll(c:Context) {
        const user = c.get('user');
        const todos = await this.prisma.todo.findMany({
            where: {userId: user.id},
            include: {category:true}
        });
        return this.success(c, todos)
    }

    async getOne(c:Context) {
        const user = c.get('user');
        const id = c.req.param('id');

        const todo = await this.prisma.todo.findFirst({
            where:{ id, userId: user.id},
            include:{category: true}
        });
        if(!todo){
            return this.notFound(c, 'Todo not found');
        }

        return this.success(c, todo)
    }
    async create(c: Context) {
        const user = c.get('user');
        const data = c.req.valid('json');

        const todo = await this.prisma.todo.create({
            data: {
                ...data,
                userId: user.id
            },
            include:{ category: true}
        });
        return this.success(c, todo, 201);
    }
    async update(c: Context) {
        const user = c.get('user');
        const id = c.req.param('id');
        const data = c.req.valid('json');

        const todo = await this.prisma.todo.findFirst({
            where: {id, userId: user.id }
        });

        if(!todo) {
            return this.notFound(c, 'Todo not found');
        }

        const updatedTodo = await this.prisma.todo.update({
            where: {id},
            data,
            include:{category: true}
        });
        return this.success(c, updatedTodo);
    }
    async delete( c:Context) {
        const user = c.get('user');
        const id = c.req.param('id');

        const todo = await this.prisma.todo.findFirst({
            where:{id, userId: user.id }
        });
        if(!todo){
            return this.notFound(c, 'Todo not found');
        }

        await this.prisma.todo.delete({
            where: {id}
        });
        return this.success(c, {message: 'Todo deleted successsfully'})
    }
}