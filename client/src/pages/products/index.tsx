import { useEffect, useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { graphqlFetcher, QueryKeys } from "../../queryClient";
import GET_PRODUCTS, { Products } from "../../graphql/products";
import ProductList from "../../components/product/list";
import useInifniteScroll from "../../hooks/useInfiniteScroll";

const ProductListPage = () => {
	const fetchMoreRef = useRef<HTMLDivElement>(null);
	const intersecting = useInifniteScroll(fetchMoreRef);
	
	const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<Products>(
		QueryKeys.PRODUCTS,
		({ pageParam = ''}) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam }),
		{
			getNextPageParam: (lastPage) => {
				return lastPage.products.at(-1)?.id;
			}
		}
	);

	useEffect(() => {
		if (!intersecting || !isSuccess || !hasNextPage && isFetchingNextPage) return;
		fetchNextPage();
		
	}, [intersecting]);

	return (
		<div>
			<h1>상품 목록</h1>
			<ProductList list={data?.pages || []} />
			<div ref={fetchMoreRef} />
		</div>
	);
};

export default ProductListPage;
