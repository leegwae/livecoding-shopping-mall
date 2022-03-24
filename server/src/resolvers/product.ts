import { v4 as uuid } from 'uuid';
import { collection, query, orderBy, where, limit, getDocs, getDoc, startAfter, DocumentData, doc } from 'firebase/firestore';
import { Products, Resolver } from './types';
import { DBField, writeDB } from '../dbController';
import { db } from '../../firebase';

const PAGE_SIZE = 15;

const setJSON = (data: Products) => writeDB(DBField.PRODUCTS, data);

const productResolver: Resolver = {
	Query: {
		products: async (parent, { cursor = '', showDelected = false }) => {
			const products = collection(db, 'products');
			const queryOptions = [orderBy('createdAt', 'desc')];
			if (cursor) queryOptions.push(startAfter(cursor));
			if (!showDelected) queryOptions.unshift(where('createdAt', '!=', null));
			const q = query(products, ...queryOptions, limit(PAGE_SIZE))
			const snapshot = await getDocs(q);
			const data: DocumentData[] = [];
			snapshot.forEach(doc => data.push(
				{
					id: doc.id,
					...doc.data(),
				}
			));
			return data;
		},
		product: async (parent, { id }) => {
			const snapshot = await getDoc(doc(db, 'products', id));
			return {
				...snapshot.data(),
				id: snapshot.id,
			}
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