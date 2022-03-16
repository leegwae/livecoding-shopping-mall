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
		(ids: PaymentInfos) => graphqlFetcher(EXECUTE_PAY, { ids })
	);

	const showModal = () => {
		setModalShown(!modalShown); 
	};

	const proceed = () => {
		const ids = checkedCartData.map(({ id }) => id);
		executePay(ids, {
			onSuccess: () => {
				setCheckedCartData([]);
				alert('결제 완료되었습니다!');
				naviate('/products', { replace: true });	
			}
		});

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