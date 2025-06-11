import {Hono} from 'hono';
import {zValidator} from '@hono/zod-validator';
import {AuthController} from '../controllers/auth.controller';
import {registerSchema, loginSchema} from '../schemas/auth.schema';

const auth = new Hono();
const authController = new AuthController();

auth.post('/register', zValidator('json', registerSchema), (c) => authController.register(c));
auth.post('/login', zValidator('json', loginSchema), (c) => authController.login(c));

export { auth };