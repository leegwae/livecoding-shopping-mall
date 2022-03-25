import { collection, query, orderBy, where, limit, getDocs, getDoc, startAfter, DocumentData, doc, updateDoc, increment, addDoc, deleteDoc } from 'firebase/firestore';
import { DBField, writeDB } from '../dbController';
import { Resolver } from './types';
import { Cart, Product } from './types';
import { db } from '../../firebase';

const setJSON = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: Resolver = {
	Query: {
		cart: async (parent, args) => {
			const cart = collection(db, 'cart');
			const snapshot = await getDocs(cart);
			const data: DocumentData[] = [];
			snapshot.forEach(doc => {
				const d = doc.data();
				data.push({
					id: doc.id,
					...d,
				});
			});
			return data;
		},
	},

	Mutation: {
		addCart: async (parent, { productId }) => {
			if (!productId) new Error('상품 id가 없어요!');
			const productRef = doc(db, 'products', productId);
			const cartCollection = collection(db, 'cart');
			const exist = (await getDocs(
				query(
					collection(db, 'cart'),
					where('product', '==', productRef)
				)
			)).docs[0];

			let cartRef;
			if (exist) {
				cartRef = doc(db, 'cart', exist.id);
				await updateDoc(cartRef, {
					amount: increment(1)
				});
			} else {
				cartRef = await addDoc(cartCollection, {
					amount: 1,
					product: productRef,
				});
			}
			const cartSnapshot= await getDoc(cartRef);
			return {
				...cartSnapshot.data(),
				product: productRef,
				id: cartSnapshot.id,
			};
		},
		updateCart: async (parent, { cartId, amount })  => {
			if (amount < 1) throw new Error('1 이하로 바꿀 수 없어요!');
			const cartRef = doc(db, 'cart', cartId);		
			if (!cartRef) new Error('장바구니 정보가 없어요!');
			await updateDoc(cartRef, {
				amount,
			});

			const cartSnapshot = await getDoc(cartRef);
			return {
				...cartSnapshot.data(),
				id: cartSnapshot.id,
			};
		},
		deleteCart: async (parent, { cartId }) => {
			const cartRef = doc(db, 'cart', cartId);		
			if (!cartRef) new Error('장바구니 정보가 없어요!');
			await deleteDoc(cartRef);
			return cartId;
		},
    executePay: async (parent, { ids }) => {
      const deletedIds = [];
	
      for await (const id of ids) {
        const cartRef = doc(db, 'cart', id);
        const cartSnapshot = await getDoc(cartRef);
        const cartData = cartSnapshot.data();
        const productRef = cartData?.product;
        if (!productRef) throw Error('상품정보가 없다.');

        const product = (await getDoc(productRef)).data() as Product;
        if (product.createdAt) {
          await deleteDoc(cartRef);
          deletedIds.push(id);
        } else {
        }
      }
      return deletedIds
    },
	},
	CartItem: {
		product: async (cartItem, args) => {
			const product = await getDoc(cartItem.product);
			const data = product.data() as any;
			return {
				...data,
				id: product.id,
			}
		},
	}
}

export default cartResolver;