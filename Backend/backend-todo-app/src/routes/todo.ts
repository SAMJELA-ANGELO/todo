import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {TodoController} from '../controllers/todo.controller';
import { TodoSchema, updateTodoSchema } from "../schemas/todos.schema";

const todos = new Hono();
const todoController = new TodoController();

todos.get('/', (c) => todoController.getAll(c));

todos.get('/:id', (c) => todoController.getOne(c));

todos.post('/', zValidator('json', TodoSchema), (c) => TodoController.create(c));

todos.put('/:id', zValidator('json', updateTodoSchema), (c) => TodoController.update(c));

todos.delete('/:id', (c) =>TodoController.delete(c));

export { todos };