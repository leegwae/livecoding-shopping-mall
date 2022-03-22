import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { Product } from "../../graphql/products";
import { graphqlFetcher } from "../../queryClient";
import { ADD_CART } from "../../graphql/cart";

const ProductItem = ({
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
				<p className="product-item__title">{title}</p>
				<img className="product-item__image" src={imageUrl} />
				<span className="product-item__price">₩{price}</span>
			</Link>
			<button
				className="product-item__add-to-cart"
				onClick={() => addToCart(id)}
			>+</button>
 		</li>		
	);
}

export default ProductItem;
