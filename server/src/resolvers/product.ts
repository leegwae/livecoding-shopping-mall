import { v4 as uuid } from 'uuid';
import { Products, Resolver } from './types';
import { DBField, writeDB } from '../dbController';

const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data);

const productResolver: Resolver = {
	Query: {
		products: (parent, { cursor = '', showDelected = false }, { db }, info) => {
			const [hasCreatedAt, hasNotCreatedAt] = [
				db.products.filter(product => !!product.createdAt).sort((a, b) => b.createdAt! - a.createdAt!),
				db.products.filter(product => !product.createdAt)
			];
			const filtered = showDelected ? [...hasCreatedAt, ...hasNotCreatedAt] : hasCreatedAt;
			const from = filtered.findIndex(product => product.id === cursor) + 1;
			return filtered.slice(from, from + 15) || [];
		},
		product: (parent, { id, cursor }, { db }, info) => {
			const found = db.products.find(item => item.id === id)
			if (found) return found;
			return null;
		}
	},

	Mutation: {
    addProduct: (parent, { imageUrl, price, title, description }, { db }) => {
      const newProduct = {
        id: uuid(),
        imageUrl,
        price,
        title,
        description,
        createdAt: Date.now(),
      }
      db.products.push(newProduct)
      setJSON(db.products)
      return newProduct
    },
		updateProduct: (parent, { id, ...data }, { db }) => {
			const existProductIndex = db.products.findIndex(item => item.id === id);
			if (existProductIndex < 0) throw new Error("없는 상품입니다!");

			const updatedItem = {
				...db.products[existProductIndex],
				...data,
			};
			db.products.splice(existProductIndex, 1, updatedItem);
			setJSON(db.products);
			return updatedItem;
		},
		deleteProduct: (praent, { id }, { db }) => {
			const existProductIndex = db.products.findIndex(item => item.id === id);
			if (existProductIndex < 0) throw new Error("없는 상품입니다!");

			const updatedItem = {
				...db.products[existProductIndex]
			};

			delete updatedItem.createdAt;
			db.products.splice(existProductIndex, 1, updatedItem);
			setJSON(db.products);
			return id;
		}
	}
}

export default productResolver;