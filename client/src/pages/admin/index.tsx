import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import GET_PRODUCTS, { Products } from '../../graphql/products';
import ProductList from '../../components/product/list';
import useIntersection from '../../hooks/useIntersection';

const AdminPage = () => {
	const fetchMoreRef = useRef<HTMLDivElement>(null);
	const intersecting = useIntersection(fetchMoreRef);
	
	const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<Products>(
		[QueryKeys.PRODUCTS, true],
		({ pageParam = ''}) => graphqlFetcher(GET_PRODUCTS, { cursor: pageParam, showDelected: true }),
		{
			getNextPageParam: (lastPage) => {
				return lastPage.products.at(-1)?.id;
			}
		}
	);

	useEffect(() => {
		if (!intersecting || !isSuccess || !hasNextPage || isFetchingNextPage) return;
		fetchNextPage();
		
	}, [intersecting]);

	return (
		<div>
			<h2>관리자</h2>
			<ProductList list={data?.pages || []} />
			<div ref={fetchMoreRef} />
		</div>
	);
};

export default AdminPage;
