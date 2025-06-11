import { Context } from "hono";
import { PrismaClient } from "@prisma/client";

export class BaseController {
    protected prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    protected success<T>(c: Context, data:T, status = 200) {
        return c.json(data, status);
    }

    protected error(c: Context, message: string, status = 400){
        return c.json({message}, status);
    }
    protected notFound(c: Context, message = 'Resource not found') {
        return this.error(c, message, 404);
    }
    protected unauthorized(c: Context, message = 'unauthorized') {
        return this.error(c,message,401);
    }
    protected forbidden(c: Context, message = 'Forbidden') {
        return this.error(c, message, 403);
    }
}