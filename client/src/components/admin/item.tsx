import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { Product } from "../../graphql/products";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";

const AdminItem = ({
	id,
	imageUrl,
	price,
	title,
	description,
	createdAt,
}: Product) => {
	const { mutate: addToCart } = useMutation((id: string) => graphqlFetcher(ADD_CART, { id }));

	return (
		<li className="product-item">
			<Link to={`/products/${id}`}>
				<p className="product-item__ti tle">{title}</p>
				<img className="product-item__image" src={imageUrl} />
				<span className="product-item__price">₩{price}</span>
			</Link>
			{!createdAt && <span>삭제된 상품입니다</span>}
			<button
				className="product-item__add-to-cart"
				onClick={() => addToCart(id)}
			>+</button>
 		</li>		
	);
}

export default AdminItem;
