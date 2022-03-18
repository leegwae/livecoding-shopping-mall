import { Resolver } from './types';

const productResolver: Resolver = {
	Query: {
		products: (parent, { cursor = '' }, { db }, info) => {
			const from = db.products.findIndex(product => product.id === cursor) + 1;
			return db.products.slice(from, from + 15) || [];
		},
		product: (parent, { id, cursor }, { db }, info) => {
			const found = db.products.find(item => item.id === id)
			if (found) return found;
			return null;
		}
	},
}

export default productResolver;