import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../atom/cart';
import { EXECUTE_PAY } from '../../graphql/payment';
import { graphqlFetcher } from '../../queryClient';
import WillPay from '../willPay';
import PaymentModal from './modal';

type PaymentInfos = string[];

const Payment = () => {
	const naviate = useNavigate();
	const [modalShown, setModalShown] = useState<boolean>(false);
	const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
	
	const { mutate: executePay } = useMutation(
		(payInfos: PaymentInfos) => graphqlFetcher(EXECUTE_PAY, payInfos)
	);

	const showModal = () => {
		setModalShown(!modalShown);
	};

	const proceed = () => {
		const payInfos = checkedCartData.map(({ id }) => id);
		executePay(payInfos);
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