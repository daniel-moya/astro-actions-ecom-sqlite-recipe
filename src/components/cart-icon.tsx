import { useStore } from '@nanostores/react';
import { cartCount, updateCartCount } from '../store';
import { useEffect } from 'react';

export default function CartIcon({ initialCount }: { initialCount: number }) {
	const $cartCount = useStore(cartCount);

	useEffect(() => {
		console.log(initialCount);
		updateCartCount(initialCount);
	}, [initialCount]);
	return (
		<a href="/cart">Cart ({$cartCount})</a>
	);
}
