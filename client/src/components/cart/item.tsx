import React, { SyntheticEvent, forwardRef, ForwardedRef } from 'react'
import { useMutation } from 'react-query';
import { CartType, DELETE_CART, UPDATE_CART } from '../../graphql/cart';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';
import ItemData from './itemData';

const CartItem = (
	{ id, imageUrl, price, title, amount }: CartType,
	ref: ForwardedRef<HTMLInputElement>
) => {
	const queryClient = getClient();
	const { mutate: updateCart } = useMutation(
    ({ id, amount }: { id: string; amount: number }) => graphqlFetcher(UPDATE_CART, { id, amount }),
		{
			onMutate: async (newValue) => {
				const { id, amount } = newValue; 

				await queryClient.cancelQueries(QueryKeys.CART);
				const prevCart = queryClient.getQueryData<{ [key: string]: CartType} >(QueryKeys.CART);
				
				if (!prevCart?.[id]) return prevCart;

				const newCart = {...(prevCart || []), [id]: { ...prevCart[id], amount }};
				queryClient.setQueryData(QueryKeys.CART, newCart);
				
				return prevCart;
			},
			onSuccess: newValue => {
        const prevCart = queryClient.getQueryData<{ [key: string]: CartType }>(QueryKeys.CART);
        const newCart = {
          ...(prevCart || {}),
          [id]: newValue,
        };
        queryClient.setQueryData(QueryKeys.CART, newCart);
      },
		}
	);

	// optimistic update 생략
  const { mutate: deleteCart } = useMutation(
    ({ id }: { id: string }) => graphqlFetcher(DELETE_CART, { id }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKeys.CART)
      },
    },
  )

	const handleUpdateAmount = (e: SyntheticEvent) => {
		const amount = Number((e.target as HTMLInputElement).value);
		if (amount >= 1) updateCart({ id, amount })
	};

	const handleDeleteItem = () => deleteCart({ id });

	return (
    <li className="cart-item">
      <input 
				className="cart-item__checkbox"
				type="checkbox"
				name="select-item"
				ref={ref}
				data-id={id}
			/>
			<ItemData imageUrl={imageUrl} title={title} price={price} />
			<input
        className="cart-item__amount"
        type="number"
        value={amount}
        min={1}
        onChange={handleUpdateAmount}
      />
			<button type="button" className="cart-item__delete" onClick={handleDeleteItem}>삭제</button>
    </li>
	);
}

export default forwardRef(CartItem);