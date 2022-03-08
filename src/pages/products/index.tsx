import { useQuery } from "react-query";
import { fetcher, QueryKeys } from "../../queryClient";
import { Product } from "../../type";
import ProductItem from "../../components/product/item";

const ProductList = () => {
	const { data } = useQuery<Product[]>(QueryKeys.PRODUCTS, () =>
		fetcher({
			method: 'GET',
			path: '/products',
		})
	);

	console.log(data);

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
