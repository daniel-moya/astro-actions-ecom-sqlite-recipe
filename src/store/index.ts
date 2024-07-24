import { atom, map } from 'nanostores';

export const cartCount = atom(0);

export type CartItem = {
	price_id: string;
	quantity: number;
}

export const cartItems = map<Record<string, CartItem>>({});

export function addCartItem({ price_id }: { price_id: string }) {
	const existingEntry = cartItems.get()[price_id];
	if (existingEntry) {
		cartItems.setKey(price_id, {
			...existingEntry,
			quantity: existingEntry.quantity + 1,
		});
	} else {
		cartItems.setKey(
			price_id,
			{ price_id, quantity: 1 }
		);
		cartCount.set(cartCount.get() + 1);
	}
}

export function decreaseCartItem({ price_id }: { price_id: string }) {
	const existingEntry = cartItems.get()[price_id];
	if (existingEntry.quantity > 1) {
		cartItems.setKey(price_id, {
			...existingEntry,
			quantity: existingEntry.quantity - 1,
		});
	} else {
		cartItems.setKey(
			price_id,
			undefined
		);
		cartCount.set(cartCount.get() - 1);
	}
}

export function removeCartItem({ price_id }: { price_id: string }) {
	cartItems.setKey(
		price_id,
		undefined
	);
	cartCount.set(cartCount.get() - 1);
}

export function emptyCart() {
	cartItems.set({});
	cartCount.set(cartCount.get() - 1);
}

export function updateCartCount(count: number) {
	cartCount.set(count);
}

export function setCartItems(items: Array<CartItem>) {
	items.map((item: CartItem) => {
		cartItems.setKey(item.price_id, {
			...item
		});
	});
}

