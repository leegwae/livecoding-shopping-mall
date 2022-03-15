import React, { createRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { checkedCartState } from '../../atom/cart';
import { CartType } from '../../graphql/cart';
import CartItem from './item';
import WillPay from '../willPay';

const CartList = ({ items }: { items: CartType[] }) => {
	const navigate = useNavigate();
	// ===================== [ 상태 관리 변수들 ] ========================================
	const [formData, setFormData] = useState<FormData>();
	const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
	// ===================== [ ref 관련 변수들 ] ========================================= 
	const formRef = useRef<HTMLFormElement>(null);
	const checkboxeRefs = items.map(() => createRef<HTMLInputElement>());

	// 개별 버튼 체크에 따라 전체 선택 버튼 핸들
	const setAllCheckedFromItems = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;
    const allChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
  };

	// 전체 선택 버튼으로 개별 버튼 전부 체크하기
	const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
		const allChecked = targetInput.checked;
		checkboxeRefs.forEach(ref => ref.current!.checked = allChecked);
	}

	const handleCheckboxChanged = (e?: SyntheticEvent) => {
		if (!formRef.current) return;

		const targetInput = e?.target as HTMLInputElement;	
		if (targetInput && targetInput.classList.contains('select-all')) {
			setItemsCheckedFromAll(targetInput);
		} else {
			setAllCheckedFromItems();
		}

		const data = new FormData(formRef.current);
		setFormData(data);
	};

	const handleSubmit = () => {
		if (checkedCartData.length) {
			navigate('/payment');
		} else {
			alert('결제할 대상이 없습니다');
		}
	};

	useEffect(() => {
		checkedCartData.forEach((item) => {
			const itemRef = checkboxeRefs.find(ref => ref.current!.dataset.id === item.id);
			if (itemRef) itemRef.current!.checked = true;
		});
		setAllCheckedFromItems();
	}, [])

	useEffect(() => {
		const checkedItems = checkboxeRefs.reduce<CartType[]>((res, ref, i) => {
			if (ref.current!.checked) res.push(items[i])
			return res
		}, []);
		setCheckedCartData(checkedItems);
	}, [items, formData]);

	return (
		<>
			<form ref={formRef} onChange={handleCheckboxChanged}>
				<label htmlFor="">
					<input className="select-all" type="checkbox" name="select-all" />
					전체선택
				</label>
				<ul className="cart">
					{items.map((item, i) => <CartItem {...item} key={item.id} ref={checkboxeRefs[i]}/>)}
				</ul>
			</form>
			<WillPay submitTitle="결제 창으로" handleSubmit={handleSubmit} />
		</>
	)
}

export default CartList;