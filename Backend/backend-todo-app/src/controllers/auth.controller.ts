import { Context } from 'hono';
import {sign} from 'jsonwebtoken';
import {hash, compare} from 'bcryptjs';
import { BaseController } from "./base.controller";

export class AuthController extends BaseController {
    async register(c: Context) {
        const {email, password, name} = c.req.valid('json');
        
        const existingUser = await this.prisma.user.findUnique({
            where:{email}
        });
        if(existingUser) {
            return this.error(c, 'Email already registered', 409);
        }
        const hashedPassword = await hash(password, 10);
        const user = await this.prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                name
            }
        });
        const token = sign({userId: user.id}, process.env.JWT_SECRET!);
        return this.success(c, {
            user:{
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        });
    }
    async login(c: Context) {
        const {email, password } = c.req.valid('json');
        const user = await this.prisma.user.findUnique({
            where: {email}
        });

        if(!user) {
            return this.unauthorized(c, 'Invalid credentials');
        }

        const validPassword = await compare(password, user.password);
        if(!validPassword) {
            return this.unauthorized(c, 'Invalid credentials');
        }

        const token = sign({userId: user.id}, process.env.JWT_SECRET!)

        return this.success(c, {
            user: {
                id: user.id,
                email: user.email,
                name: user.name
            },
            token
        });
    }
}