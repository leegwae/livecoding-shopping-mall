import { gql } from 'graphql-tag';

export type Product = {
	id: string;
	imageUrl: string;
	price: string;
	title: string;
	description: string;
	createAt: string;
}

export type Products = {
	products: Product[];
}

export const GET_PRODUCTS = gql`
	query GET_PRODUCTS {
		id
		imageUrl
		price
		title
		description
		createAt
	}
`;

export const GET_PRODUCT = gql`
	query GET_PRODUCT {
		id
		imageUrl
		price
		title
		description
		createAt
	}
`;