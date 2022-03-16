import gql from "graphql-tag";
import { Product, Products } from "./products";

export type CartType = {
	id: string;
	product: Product;
	amount: number;
}

export const GET_CART = gql`
  query GET_CART {
    cart {
      id
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
      amount
    }
  }
`;

export const UPDATE_CART = gql`
  mutation UPDATE_CART($id: ID!, $amount: Int!) {
    updateCart(id: $id, amount: $amount) {
      id
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
      amount
    }
  }
`

export const ADD_CART = gql`
  mutation Mutation($id: ID!) {
    addCart(id: $id) {
      id
      product {
        id
        imageUrl
        price
        title
        description
        createdAt
      }
      amount
    }
  }
`

export const DELETE_CART = gql`
  mutation DELETE_CART($id: ID!) {
    deleteCart {
      id
    }
  }
`;