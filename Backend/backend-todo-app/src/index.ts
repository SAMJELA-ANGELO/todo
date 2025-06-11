import { swaggerUI } from '@hono/swagger-ui'
import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import {OpenAPIHono} from '@hono/zod-openapi'
import {auth} from './routes/auth'
import {todos} from './routes/todos'
import {categories} from './routes/categories'
import { errorHandler } from './middleware/error-handler'
import {authMiddleware} from './middleware/auth'

const app = new OpenAPIHono();

//Middleware
app.use('*', logger());
app.use("*",prettyJSON());
app.use('*', cors({
  origin:['http://localhost:4200'],
  allowMethods:['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders:['content-Type', 'Authorization'],
  exposeHeaders:['content-length', 'X-kuma-Revision'],
  maxAge:600,
  credentials: true,
}));
app.use('/api/*', errorHandler);

// API Documentation

app.get('/swagger', swaggerUI({url: '/api-docs'}));


// Routes
app.route('/api/*', auth)
app.use('api/*', authMiddleware);
app.route('/api/todos', todos);
app.route('/api/categories', categories);

// Health check
app.get('/health', (c) =>c.json({status:'ok'}));

//Start server
const port = process.env.PORT || 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port:Number(port)
});
