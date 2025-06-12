import {createRoute, OpenAPIHono} from '@hono/zod-openapi'
import {AuthController} from '../controllers/auth.controller';
import {registerSchema, loginSchema} from '../schemas/auth.schema';

const auth = new OpenAPIHono();
const authController = new AuthController();

//register route
const registerRoute = createRoute({
    method: 'post',
    path: '/register',
    tags: ['Auth'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: registerSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: 'User registered succesfully',
            content:{
                'application/json':{
                    schema: {
                        type: 'object',
                        properties:{
                            user:{
                                type:'object',
                                properties: {
                                    id: {types: 'string'},
                                    email: {type: 'string'},
                                    name: {type: 'string'}
                                }
                            },
                            token: {type: 'string'}
                        }
                    }
                }
            }
        },
        409: {
            description: 'Email already registered'
        }
    }
});

//login route
const loginRoute = createRoute({
    method: 'post',
    path: '/login',
    tags: ['Auth'],
    request: {
        body: {
            content: {
                'application/json': {
                    schema: loginSchema
                }
            }
        }
    },
    responses: {
        200: {
            description: 'Login succesful',
            content:{
                'application/json':{
                    schema: {
                        type: 'object',
                        properties:{
                            user:{
                                type:'object',
                                properties: {
                                    id: {types: 'string'},
                                    email: {type: 'string'},
                                    name: {type: 'string'}
                                }
                            },
                            token: {type: 'string'}
                        }
                    }
                }
            }
        },
        401: {
            description: 'Invalid credentials'
        }
    }
});


auth.openapi( registerRoute, (c) => authController.register(c));
auth.openapi(loginRoute, (c) => authController.login(c));

export { auth };