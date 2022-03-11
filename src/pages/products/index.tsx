import { useQuery } from "react-query";
import { restFetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../type";
import ProductItem from "../../components/product/item";

const ProductList = () => {
	const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
		restFetcher({
			method: 'GET',
			path: '/products',
		})
	);

	return (
		<>
			<h1>상품 목록</h1>
			<div>
				<ul className="products">
					{data?.map((product: Product) =>
						<ProductItem {...product} key={product.id} />)
					}
				</ul>
			</div>
		</>
	);
}

export default ProductList;
