import { v4 as uuid } from 'uuid';
import { collection, query, orderBy, where, limit, getDocs, getDoc, startAfter, DocumentData, doc, serverTimestamp, addDoc, updateDoc } from 'firebase/firestore';
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
    addProduct: async (parent, { imageUrl, price, title, description }) => {
      const newProduct = {
        imageUrl,
        price,
        title,
        description,
        createdAt: serverTimestamp(),
      }
			const result = await addDoc(collection(db, 'products'), newProduct);
			const snapshot = await getDoc(result);
      return {
				...snapshot.data(),
				id: snapshot.id,
			}
    },
		updateProduct: async (parent, { id, ...data }) => {
			const productRef = doc(db, 'products', id);
			if (!productRef) throw new Error('상품이 없습니다');
			await updateDoc(productRef, data);
			const snapshot = await getDoc(productRef);
			return {
				...snapshot.data(),
				id: snapshot.id,
			};
		},
		deleteProduct: async (praent, { id }) => {
			const productRef = doc(db, 'products', id);
			if (!productRef) throw new Error('상품이 없습니다');
			await updateDoc(productRef, { createdAt: null });
			return id;
		}
	}
}

export default productResolver;