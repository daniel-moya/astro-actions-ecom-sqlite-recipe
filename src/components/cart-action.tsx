import { actions } from 'astro:actions';
import { addCartItem, decreaseCartItem, removeCartItem, emptyCart } from '../store';

const user_id = 1;

export default function CartAction({ action, priceId: price_id, text }: { action: string, priceId: string, text?: string }) {
	async function add() {
		const result = await actions.cart.add.safe({ price_id, user_id });
		if (result.error) {
			return;
		}
		return document.location.replace("/cart");

	}

	async function increment() {
		const result = await actions.cart.add.safe({ price_id, user_id });
		if (result.error) {
			return;
		}
		addCartItem({ price_id });
	}


	async function decrement() {
		const result = await actions.cart.decrement.safe({ price_id, user_id });
		if (result.error) {
			return;
		}
		decreaseCartItem({ price_id });

	}

	async function deleter() {
		const result = await actions.cart.delete.safe({ price_id, user_id: 1 });
		if (result.error) {
			return;
		}
		removeCartItem({ price_id });

		console.log(result);
	}


	async function empty() {
		const result = await actions.cart.empty.safe({ user_id: 1 });
		console.log(result);
		if (result.error) {
			return;
		}
		emptyCart();
	}

	async function handleAction() {
		const handlers_map = {
			add: add,
			increment: increment,
			decrement: decrement,
			delete: deleter,
			empty: empty,
		};
		handlers_map[action]();
	}

	return (
		<button
			type="button"
			onClick={handleAction}
		>
			{text || action}
		</button>
	);
}


