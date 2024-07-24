import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const cartItems = sqliteTable('cart_items', {
	id: integer('id').primaryKey().unique(),
	price_id: text('price_id').unique(),
	user_id: integer('user_id'),
	quantity: integer('quantity'),
	created_at: text('created_at')
});


