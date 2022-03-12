import React from 'react';
import { CartType } from '../../graphql/cart';
import CartItem from './item';

const CartList = ({ items }: { items: CartType[] }) => {
	return (
		<ul>
			{items.map(item => <CartItem item={item} key={item.id} />)}
		</ul>
	)
}

export default CartList;