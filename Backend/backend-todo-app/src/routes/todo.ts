import {TodoController} from '../controllers/todo.controller';
import { TodoSchema, updateTodoSchema } from "../schemas/todos.schema";
import { createRoute, OpenAPIHono} from '@hono/zod-openapi'

const todos = new OpenAPIHono();
const todoController = new TodoController();

//Get all todos route
const getAllTodosRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Todos'],
    security:[{bearerAuth: []}],
    responses: {
        200: {
            description: 'List of todos',
            content:{
                'application/json': {
                    schema: {
                        type: 'array',
                        items:{
                            type: 'object',
                            properties: {
                                id: { type: 'string'},
                                title: {type: 'string'},
                                description: {type: 'string'},
                                priority:{type: 'string', enum: ['LOW','MEDIUM','HIGH']},
                                status:{type: 'string', enum:['PENDING', 'IN_PROGRESS', 'COMPLETED']},
                                categoryId:{type: 'string',},
                                dueDate:{type: 'string', fomat: 'date-time' },
                                userId: {type: 'string'},
                                createdAt: {type: 'string', format: 'date-time'},
                                updatedAt: {type: 'string', format: 'date-time'}
                            }
                        }
                    }
                }
            }
        }
    }
});

//Get one todo
const getOneTodoRoute = createRoute({
    method: 'get',
    path: '/:id',
    tags: ['Todos'],
    security: [{ bearerAuth: []}],
    responses:{
        200:{
            description: 'Todo details',
            content:{
                'application/json':{
                    schema: {
                        type: 'object',
                        properties: {
                                id: { type: 'string'},
                                title: {type: 'string'},
                                description: {type: 'string'},
                                priority:{type: 'string', enum: ['LOW','MEDIUM','HIGH']},
                                status:{type: 'string', enum:['PENDING', 'IN_PROGRESS', 'COMPLETED']},
                                categoryId:{type: 'string',},
                                dueDate:{type: 'string', fomat: 'date-time' },
                                userId: {type: 'string'},
                                createdAt: {type: 'string', format: 'date-time'},
                                updatedAt: {type: 'string', format: 'date-time'}
                            }
                    }
                }
            }
        },
        404:{
            description:'Todo not found'
        }

    }
});

//create  todo route
const createTodoRoute = createRoute({
    method:'post',
    path:'/',
    tags:['Todos'],
    security:[{bearerAuth: []}],
    request:{
        body:{
            content: {
                'application/json': {
                    schema: TodoSchema
                }
            }
        }
    },
    responses:{
        201: {
            description: 'Todo createed successfully',
            content:{
                'appplication/json': {
                    schema: {
                        type: 'object',
                        properties: {
                                id: { type: 'string'},
                                title: {type: 'string'},
                                description: {type: 'string'},
                                priority:{type: 'string', enum: ['LOW','MEDIUM','HIGH']},
                                status:{type: 'string', enum:['PENDING', 'IN_PROGRESS', 'COMPLETED']},
                                categoryId:{type: 'string',},
                                dueDate:{type: 'string', fomat: 'date-time' },
                                userId: {type: 'string'},
                                createdAt: {type: 'string', format: 'date-time'},
                                updatedAt: {type: 'string', format: 'date-time'}
                        }
                    }
                }
            }
        }
    }
});

//update todo route
const updateTodoRoute = createRoute({
    method:'put',
    path:'/:id',
    tags:['Todos'],
    security:[{bearerAuth: []}],
    request:{
        body:{
            content: {
                'application/json': {
                    schema: updateTodoSchema
                }
            }
        }
    },
    responses:{
        201: {
            description: 'Todo updated successfully',
            content:{
                'appplication/json': {
                    schema: {
                        type: 'object',
                        properties: {
                                id: { type: 'string'},
                                title: {type: 'string'},
                                description: {type: 'string'},
                                priority:{type: 'string', enum: ['LOW','MEDIUM','HIGH']},
                                status:{type: 'string', enum:['PENDING', 'IN_PROGRESS', 'COMPLETED']},
                                categoryId:{type: 'string',},
                                dueDate:{type: 'string', fomat: 'date-time' },
                                userId: {type: 'string'},
                                createdAt: {type: 'string', format: 'date-time'},
                                updatedAt: {type: 'string', format: 'date-time'}
                        }
                    }
                }
            }
        },
        404:{
            description: 'Todo not found'
        }
    }
});

//Delete todo route
const deleteTodoRoute = createRoute({
    method: 'delete',
    path: '/:id',
    tags:['Todos'],
    security: [{bearerAuth: []}],
    responses: {
        200: {
            description: 'Todo deleted successfully',
            content:{
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {type: 'string'}
                        }
                    }
                }
            }
        },
        404:{
            description: 'Todo not found'
        }
    }
})
todos.openapi(getAllTodosRoute, (c) => todoController.getAll(c));

todos.openapi(getOneTodoRoute, (c) => todoController.getOne(c));

todos.openapi(createTodoRoute, (c) => todoController.create(c));

todos.openapi(updateTodoRoute, (c) => todoController.update(c));

todos.openapi(deleteTodoRoute, (c) =>todoController.delete(c));
export { todos };