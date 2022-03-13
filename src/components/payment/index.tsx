import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { checkedCartState } from '../../atom/cart';
import WillPay from '../willPay';
import PaymentModal from './modal';

const Payment = () => {
	const naviate = useNavigate();
	const [modalShown, setModalShown] = useState<boolean>(false);
	const setCheckedCartData = useSetRecoilState(checkedCartState);
	
	const showModal = () => {
		setModalShown(!modalShown);
	};

	const proceed = () => {
		setCheckedCartData([]);
		naviate('/products', { replace: true });
	}

	const cancel = () => {
		setModalShown(false);
	}

	return (
		<div>
			<WillPay submitTitle="결제하기" handleSubmit={showModal} />
			<PaymentModal show={modalShown} proceed={proceed} cancel={cancel} />
		</div>
	)
}

export default Payment;