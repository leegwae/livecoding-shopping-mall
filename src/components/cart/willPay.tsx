import React from 'react'
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { checkedCartState } from '../../atom/cart';
import ItemData from './itemData';

const WillPay = () => {
	const checkedItems = useRecoilValue(checkedCartState);
	const totalPrice = checkedItems.reduce((acc, { price, amount }) => acc + price * amount, 0);

	return (
		<div className="cart-willpay">
			<ul>
				{checkedItems.map(({ imageUrl, title, price, amount, id }) =>
					<li key={id}>
						<ItemData key={id} imageUrl={imageUrl} title={title} price={price} />
						<p>수량: {amount}</p>
						<p>금액: {price * amount}</p>
					</li>
				)}
			</ul>
			<p>총액: {totalPrice}</p>
			<Link to="/payment">결제하기</Link>
		</div>
	);
};

export default WillPay;