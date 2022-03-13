import React, { SyntheticEvent } from 'react'
import { useMutation } from 'react-query';
import { stringify } from 'uuid';
import { CartType, UPDATE_CART } from '../../graphql/cart';
import { getClient, graphqlFetcher, QueryKeys } from '../../queryClient';

const CartItem = ({
	id,
	imageUrl,
	price,
	title,
	amount,
}: CartType ) => {
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

	const handleUpdateAmount = (e: SyntheticEvent) => {
		const amount = Number((e.target as HTMLInputElement).value);
		updateCart({ id, amount })
		
	};

	return (
    <li className="cart-item">
      <input className="cart-item__checkbox" type="checkbox" name="select-item" />
      <img className="cart-item__image" src={imageUrl} />
      <p className="cart-item__price">{price}</p>
      <p className="cart-item__title">{title}</p>
			<input
        className="cart-item__amount"
        type="number"
        value={amount}
        min={1}
        onChange={handleUpdateAmount}
      />
    </li>
	);
}

export default CartItem;