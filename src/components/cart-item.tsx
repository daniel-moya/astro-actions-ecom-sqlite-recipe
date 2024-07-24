import CartAction from './cart-action';
import type { CartItem } from '../types/cart-items';

interface Props {
	item: CartItem;
}

export default function CartItem({ item }: Props) {
	const {
		name,
		description,
		image,
		price_id: priceId,
		quantity
	} = item;
	return (
		<article>
			<h3>{name}</h3>
			<p>{description}</p>
			<img
				height="200"
				width="200"
				src={image}
			/>
			<div>Id: {priceId}</div>
			<div>Quantity: {quantity}</div>
			<CartAction
				action="decrement"
				text="-"
				priceId={priceId}
			/>
			<CartAction
				action="increment"
				text="+"
				priceId={priceId}
			/>

			<CartAction
				action="delete"
				priceId={priceId}
			/>
		</article>

	);
}
