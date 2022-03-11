import { gql } from 'graphql-tag';

export type Product = {
	id: string;
	imageUrl: string;
	price: string;
	title: string;
	descrption: string;
	createAt: string;
}
const GET_PRODUCTS = gql`
	query GET_PRODUCTS {
		id
		imageUrl
		price
		title
		descrption
		createAt
	}
`;

export default GET_PRODUCTS;