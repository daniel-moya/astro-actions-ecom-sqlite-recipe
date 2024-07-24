import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const products = sqliteTable('products', {
	id: text('id').primaryKey().unique(),
	active: integer('active', { mode: 'boolean' }),
	name: text('name'),
	description: text('description'),
	image: text('image'),
	metadata: text('metadata')
});
