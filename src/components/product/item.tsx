import { Link } from "react-router-dom";
import { useRecoilValue, useRecoilState, SetRecoilState } from 'recoil';
import { cartItemAmountQuery } from "../../atom/cart";
import { Product } from "../../graphql/products";

const ProductItem = ({
	id,
	imageUrl,
	price,
	title,
	description,
	createAt,
}: Product) => {
	const [cartAmount, setCartAmount] = useRecoilState(cartItemAmountQuery(id));

	const addToCart = () => setCartAmount((cartAmount || 0) + 1);

	return (
		<li className="product-item">
			<Link to={`/products/${id}`}>
				<p className="product-item__title">{title}</p>
				<img className="product-item__image" src={imageUrl} />
				<span className="product-item__price">${price}</span>
			</Link>
			<button className="product-item__add-to-cart" onClick={addToCart}>+</button>
			<span>{cartAmount || 0}</span>
 		</li>		
	);
}

export default ProductItem;
