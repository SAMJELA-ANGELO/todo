import { createRoute, OpenAPIHono} from '@hono/zod-openapi'
import { CategoryController} from '../controllers/category.controller';
import { categorySchema, updateCategorySchema } from "../schemas/category.schema";

const categories = new OpenAPIHono();
const categoryController = new CategoryController();

//Get all categories route
const getAllCategoriesRoute = createRoute({
    method: 'get',
    path: '/',
    tags: ['Categories'],
    security:[{bearerAuth: []}],
    responses: {
        200: {
            description: 'List of categories',
            content:{
                'application/json': {
                    schema: {
                        type: 'array',
                        items:{
                            type: 'object',
                            properties: {
                                id: { type: 'string'},
                                name: {type: 'string'},
                                color: {type: 'string'},
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

//Get one category
const getOneCategoryRoute = createRoute({
    method: 'get',
    path: '/:id',
    tags: ['Categories'],
    security: [{ bearerAuth: []}],
    responses:{
        200:{
            description: 'Category details',
            content:{
                'application/json':{
                    schema: {
                        type: 'object',
                        properties: {
                                id: { type: 'string'},
                                name: {type: 'string'},
                                color: {type: 'string'},
                                userId: {type: 'string'},
                                createdAt: {type: 'string', format: 'date-time'},
                                updatedAt: {type: 'string', format: 'date-time'}
                            }
                    }
                }
            }
        },
        404:{
            description:'Category not found'
        }

    }
});

//create  category route
const createCategoryRoute = createRoute({
    method:'post',
    path:'/',
    tags:['Categories'],
    security:[{bearerAuth: []}],
    request:{
        body:{
            content: {
                'application/json': {
                    schema: categorySchema
                }
            }
        }
    },
    responses:{
        201: {
            description: 'Category createed successfully',
            content:{
                'appplication/json': {
                    schema: {
                        type: 'object',
                        properties: {
                             id: { type: 'string'},
                                name: {type: 'string'},
                                color: {type: 'string'},
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

//update category route
const updateCategoryRoute = createRoute({
    method:'put',
    path:'/:id',
    tags:['Categories'],
    security:[{bearerAuth: []}],
    request:{
        body:{
            content: {
                'application/json': {
                    schema: updateCategorySchema
                }
            }
        }
    },
    responses:{
        201: {
            description: 'Category updated successfully',
            content:{
                'appplication/json': {
                    schema: {
                        type: 'object',
                        properties: {
                             id: { type: 'string'},
                                name: {type: 'string'},
                                color: {type: 'string'},
                                userId: {type: 'string'},
                                createdAt: {type: 'string', format: 'date-time'},
                                updatedAt: {type: 'string', format: 'date-time'}
                        }
                    }
                }
            }
        },
        404:{
            description: 'Category not found'
        }
    }
});

//Delete category route
const deleteCategoryRoute = createRoute({
    method: 'delete',
    path: '/:id',
    tags:['Categories'],
    security: [{bearerAuth: []}],
    responses: {
        200: {
            description: 'Category deleted successfully',
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
            description: 'Category not found'
        }
    }
})
categories.openapi(getAllCategoriesRoute, (c) => categoryController.getAll(c));

categories.openapi(getOneCategoryRoute, (c) => categoryController.getOne(c));

categories.openapi(createCategoryRoute, (c) => categoryController.create(c));

categories.openapi(updateCategoryRoute, (c) => categoryController.update(c));

categories.openapi(deleteCategoryRoute, (c) =>categoryController.delete(c));

export { categories };