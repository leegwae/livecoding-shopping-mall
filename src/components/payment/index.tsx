import React from 'react';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../atom/cart';
import WillPay from '../willPay';


const Payment = () => {
	const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
	
	return (
		<div>
			<WillPay />
		</div>
	)
}

export default Payment;