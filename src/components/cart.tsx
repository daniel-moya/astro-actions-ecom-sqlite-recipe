import { useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { cartItems, setCartItems } from '../store';
import type { CartItem } from '../types/cart-items';
import CartItemComponent from './cart-item';

const userId = 1;
interface Props {
	initialItems: Array<CartItem>
}

export default function Cart({ initialItems }: Props) {
	const $items = useStore(cartItems);

	useEffect(() => {
		setCartItems(initialItems);
	}, [initialItems])

	return (
		<div className="grid">
			{Object.values($items).length ? (
				Object.values($items).map(
					(item: CartItem) => <CartItemComponent item={item} />
				)
			) : null}
		</div>
	)
}
