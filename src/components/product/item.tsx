import { Link } from "react-router-dom";
import { Product } from "../../type";

const ProductItem = ({
  id,
	category,
  image,
  price,
  rating,
  title,
}: Product) => {
	return (
		<li className="product-item">
			<Link to={`/products/${id}`}>
				<p className="product-item__category">{category}</p>
				<p className="product-item__title">{title}</p>
				<img className="product-item__image" src={image} />
				<span className="product-item__price">${price}</span>
				<span className="product-item__rate">{rating.rate}</span>
			</Link>
 		</li>		
	);
}

export default ProductItem;