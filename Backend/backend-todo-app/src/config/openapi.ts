import { OpenAPIObject} from '@hono/zod-openapi';
import { bearerAuth } from 'hono/bearer-auth';


export const openApiConfig: OpenAPIObject ={
    openapi: '3.0.0',
    info:{
        title: 'Todo APP API',
        version: '1.0.0',
        description: 'API for managing todos and categories'
    },
    servers: [
        {  
        url: 'http://localhost:3000',
        description:' Local development server'
    }
    ],
    tags:[
        {
            name: 'Auth',
            description: 'Authentication endpoints',
        },
        {
            name: 'Todos',
            description:'Todo management endpoints'
        },
        {
            name:'categories',
            description:'Category management endpoints'
        }
    ],
    components:{
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security:[
        {
            bearerAuth:[]
        }
    ]
}