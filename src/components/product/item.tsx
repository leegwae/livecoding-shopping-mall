import { Product } from "../../type";

const ProductItem = ({
	category,
  description,
  id,
  image,
  price,
  rating,
  title,
}: Product) => {
	return (
		<li>
      <p>{category}</p>
      <p>{title}</p>
      <img src={image} />
      <span>${price}</span>
      <span>{rating.rate}</span>
 		</li>		
	);
}

export default ProductItem;
