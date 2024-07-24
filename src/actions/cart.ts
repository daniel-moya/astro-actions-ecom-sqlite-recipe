import { defineAction, z } from 'astro:actions';
import { db } from '../libs/turso';
import { eq, and } from 'drizzle-orm';
import { cartItems } from '../models/index';

// Utility function to check for the existence of a cart item
async function getCartItem(user_id: number, price_id: string) {
	const [item] = await db.select()
		.from(cartItems)
		.where(
			and(
				eq(cartItems.user_id, user_id),
				eq(cartItems.price_id, price_id)
			)
		)
		.limit(1);
	return item;
}

// Utility function to update a cart item
async function updateCartItem(user_id: number, price_id: string, quantity: number) {
	await db.update(cartItems)
		.set({ quantity })
		.where(and(eq(cartItems.user_id, user_id), eq(cartItems.price_id, price_id)));
}

// Utility function to insert a new cart item
async function insertCartItem(user_id: number, price_id: string, quantity: number) {
	await db.insert(cartItems).values({ user_id, price_id, quantity });
}

interface ItemInput {
	price_id: string;
	user_id: number;
}

export default {
	add: defineAction({
		accept: "json",
		input: z.object({
			price_id: z.string(),
			user_id: z.number(),
		}),
		handler: async ({ user_id, price_id }: ItemInput) => {
			const existingItem = await getCartItem(user_id, price_id);
			console.log(existingItem);
			if (existingItem) {
				const newQuantity = existingItem.quantity + 1;
				await updateCartItem(user_id, price_id, newQuantity);
			} else {
				await insertCartItem(user_id, price_id, 1);
			}
		},
	}),
	decrement: defineAction({
		accept: "json",
		input: z.object({
			price_id: z.string(),
			user_id: z.number(),
		}),
		handler: async ({ user_id, price_id }) => {
			try {
				const existingItem = await getCartItem(user_id, price_id);
				if (existingItem) {
					if (existingItem.quantity > 1) {
						const newQuantity = existingItem.quantity - 1;
						await updateCartItem(user_id, price_id, newQuantity);
					} else {
						await db.delete(cartItems)
							.where(and(eq(cartItems.user_id, user_id), eq(cartItems.price_id, price_id)));
					}
				}
				return { success: true };
			} catch (error) {
				console.error(error);
				return { success: false, message: "Error decrementing item in cart" };
			}
		},
	}),
	delete: defineAction({
		accept: "json",
		input: z.object({
			price_id: z.string(),
			user_id: z.number(),
		}),
		handler: async ({ user_id, price_id }: ItemInput) => {
			try {
				const existingItem = await getCartItem(user_id, price_id);
				if (existingItem) {
					await db.delete(cartItems)
						.where(and(eq(cartItems.user_id, user_id), eq(cartItems.price_id, price_id)));
				}
				return { success: true };
			} catch (error) {
				console.error(error);
				return { success: false, message: "Error deleting item from cart" };
			}
		},
	}),
	empty: defineAction({
		accept: "json",
		input: z.object({
			user_id: z.number(),
		}),
		handler: async ({ user_id }: { user_id: number }) => {
			try {
				await db.delete(cartItems).where(eq(cartItems.user_id, user_id));
				return { success: true };
			} catch (error) {
				console.error(error);
				return { success: false, message: "Error emptying cart" };
			}
		},
	}),
}
