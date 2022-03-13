import React from 'react';
import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import GET_PRODUCTS, { Product, Products } from "../../graphql/products";
import ProductItem from "../../components/product/item";


const ProductList = ({ list }: { list: Product[] }) => {
	return (
		<ul className="products">
			{list.map((product: Product) =>
				<ProductItem {...product} key={product.id} />)
			}
		</ul>
	);
};

export default ProductList;