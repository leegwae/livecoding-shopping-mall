import React from 'react';
import { Product } from "../../graphql/products";
import ProductItem from "../../components/product/item";


const ProductList = ({ list }: { list: { products: Product[] }[] }) => {
	return (
		<ul className="products">
			{list.map(page => page.products.map(product =>
				<ProductItem {...product} key={product.id} />
			))} 
		</ul>
	);
};

export default ProductList;