import React, { createRef, SyntheticEvent, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { checkedCartState } from '../../atom/cart';
import { CartType } from '../../graphql/cart';
import CartItem from './item';

const CartList = ({ items }: { items: CartType[] }) => {
	const setCheckedCartState = useSetRecoilState(checkedCartState);
	const formRef = useRef<HTMLFormElement>(null);
	const checkboxeRefs = items.map(() => createRef<HTMLInputElement>());

	const handleCheckboxChanged = (e: SyntheticEvent) => {
		if (!formRef.current) return;

		const targetInput = e.target as HTMLInputElement;	
		const data = new FormData(formRef.current);
		const selectedCount = data.getAll('select-item').length;

		if (targetInput.classList.contains('select-all')) {
			const allChecked = targetInput.checked;
			checkboxeRefs.forEach(ref => {
				ref.current!.checked = allChecked;
				
			});
		} else {
			const allChecked = (selectedCount === items.length);
			formRef.current.querySelector<HTMLInputElement>('.select-all')!.checked = allChecked;
		}
		
		const checkedItems = checkboxeRefs.reduce<CartType[]>((res, ref, i) => {
			if (ref.current!.checked) res.push(items[i])
			return res
		}, []);
		setCheckedCartState(checkedItems);
	};

	return (
		<form ref={formRef} onChange={handleCheckboxChanged}>
			<label htmlFor="">
				<input className="select-all" type="checkbox" name="select-all" />
				전체선택
			</label>
			<ul className="cart">
				{items.map((item, i) => <CartItem {...item} key={item.id} ref={checkboxeRefs[i]}/>)}
			</ul>
		</form>

	)
}

export default CartList;