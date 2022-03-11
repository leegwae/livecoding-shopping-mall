// src/mocks/handlers.js
import { graphql } from 'msw'
import { QueryKeys } from '../../queryClient'

export const handlers = [
  graphql.query(QueryKeys.PRODUCTS, (req, res, ctx) => {
		
	}),
]