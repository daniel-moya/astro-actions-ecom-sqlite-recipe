import { z } from 'zod';

const cartItems = z.object({
	name: z.string(),
	description: z.string(),
	image: z.string(),
	price_id: z.string(),
	quantity: z.number(),
	created_at: z.string(),
});

export type CartItem = z.infer<typeof cartItems>;


