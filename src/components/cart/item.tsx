import React from 'react'
import { CartType } from '../../graphql/cart';

const CartItem = ({ item }: { item: CartType }) => {
	return (
		<li>
			<span>{item.title}	</span>
			<span>{item.amount}</span>
		</li>
	);
}

export default CartItem;