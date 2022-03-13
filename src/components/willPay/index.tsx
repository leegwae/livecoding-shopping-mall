import React from 'react'
import { useRecoilValue } from 'recoil';
import { Link, useNavigate } from 'react-router-dom';
import { checkedCartState } from '../../atom/cart';
import ItemData from '../cart/itemData';

const WillPay = () => {
	const navigate = useNavigate();
	const checkedItems = useRecoilValue(checkedCartState);
	const totalPrice = checkedItems.reduce((acc, { price, amount }) => acc + price * amount, 0);

	const handleSubmit = () => {
		if (checkedItems.length) {
			navigate('/payment')
		} else {
			alert('결제할 대상이 없습니다');
		}
	}
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
			<button onClick={handleSubmit}>결제하기</button>
		</div>
	);
};

export default WillPay;