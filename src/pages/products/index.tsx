import { useQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import GET_PRODUCTS, { Product, Products } from "../../graphql/products";
import ProductList from "../../components/product/list";

const ProductListPage = () => {
	const { data } = useQuery<Products>(QueryKeys.PRODUCTS, () =>
		graphqlFetcher(
			GET_PRODUCTS
		)
	);

	return (
		<>
			<h1>상품 목록</h1>
			<div>
				<ProductList list={data?.products || []} />
			</div>
		</>
	);
};

export default ProductListPage;
