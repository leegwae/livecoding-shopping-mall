import React, { createRef, SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { checkedCartState } from '../../atom/cart';
import { CartType } from '../../graphql/cart';
import CartItem from './item';
import WillPay from '../willPay';

const CartList = ({ items }: { items: CartType[] }) => {
	const [formData, setFormData] = useState<FormData>();
	const [checkedCartData, setCheckedCartData] = useRecoilState(checkedCartState);
	const formRef = useRef<HTMLFormElement>(null);
	const checkboxeRefs = items.map(() => createRef<HTMLInputElement>());

	const setAllCheckedFromItems = () => {
    if (!formRef.current) return;
    const data = new FormData(formRef.current);
    const selectedCount = data.getAll('select-item').length;
    const allChecked = selectedCount === items.length;
    formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
  };

	const setItemsCheckedFromAll = (targetInput: HTMLInputElement) => {
		const allChecked = targetInput.checked;
		checkboxeRefs.forEach(ref => {
			ref.current!.checked = allChecked;
		});
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
			<WillPay />
		</>
	)
}

export default CartList;