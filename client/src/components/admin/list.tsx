import React from 'react';
import { Product } from "../../graphql/products";
import AdminItem from './item';


const AdminList = ({ list }: { list: { products: Product[] }[] }) => {
	return (
		<ul className="products">
			{list.map(page => page.products.map(product =>
				<AdminItem {...product} key={product.id} />
			))} 
		</ul>
	);
};

export default AdminList;