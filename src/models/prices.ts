import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const prices = sqliteTable('prices', {
	id: text('id').primaryKey().unique(),
	product_id: text('product_id'),
	active: integer('active', { mode: 'boolean' }),
	description: text('description'),
	unit_amount: integer('unit_amount'),
	currency: text('currency'),
	type: integer('type')
});


