import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { graphqlFetcher, QueryKeys } from '../../queryClient';
import GET_PRODUCTS, { Products } from '../../graphql/products';
import useIntersection from '../../hooks/useIntersection';
import AddForm from '../../components/admin/addForm';
import AdminList from './list';

const Admin = () => {
	const fetchMoreRef = useRef<HTMLDivElement>(null);
	const intersecting = useIntersection(fetchMoreRef);
	
	const { data, isSuccess, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<Products>(
		[QueryKeys.PRODUCTS, 'admin'],
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
		<>
			<AddForm />
			<AdminList list={data?.pages || []} />
			<div ref={fetchMoreRef} />
		</>
	);
};

export default Admin;
