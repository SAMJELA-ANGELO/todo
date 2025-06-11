import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CategoryController} from '../controllers/category.controller';
import { categorySchema, updateCategorySchema } from "../schemas/category.schema";

const categories = new Hono();
const categoryController = new CategoryController();

categories.get('/', (c) => categoryController.getAll(c));

categories.get('/:id', (c) => categoryController.getOne(c));

categories.post('/', zValidator('json', categorySchema), (c) => categoryController.create(c));

categories.put('/:id', zValidator('json', updateCategorySchema), (c) => categoryController.update(c));

categories.delete('/:id', (c) =>categoryController.delete(c));

export { categories };