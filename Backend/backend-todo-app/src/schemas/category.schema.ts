import { z } from 'zod';
export const categorySchema = z.object({
    name:z.string().min(1),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/)
});

export const updateCategorySchema = categorySchema.partial();