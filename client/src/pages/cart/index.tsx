import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import { GET_CART, CartType } from "../../graphql/cart";
import CartList from "../../components/cart/list";

const Cart = () => {
	const { data } = useQuery(QueryKeys.CART, () => graphqlFetcher(GET_CART), {
		staleTime: 0,
		cacheTime: 0,
	});
  const cartItems = (data?.cart || []) as CartType[];
	console.log(cartItems)
  if (!cartItems.length) return <div>장바구니가 비었어요!</div>;

	return <CartList items={cartItems} />;
}

export default Cart;
