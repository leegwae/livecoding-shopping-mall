import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import GET_PRODUCTS, { Product, Products } from "../../graphql/products";
import ProductItem from "../../components/product/item";

const ProductList = () => {
	const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
		graphqlFetcher(
			GET_PRODUCTS
		)
	);

	return (
		<>
			<h1>상품 목록</h1>
			<div>
				<ul className="products">
					{data?.products?.map((product: Product) =>
						<ProductItem {...product} key={product.id} />)
					}
				</ul>
			</div>
		</>
	);
}

export default ProductList;
