import { DBField, writeDB } from '../dbController';
import { Resolver } from './types';
import { Cart } from './types';

const setJSON = (data: Cart) => writeDB(DBField.CART, data);

const cartResolver: Resolver = {
	Query: {
		cart: (parent, args, { db }, info) => {
			return db.cart.map((cartItem)=> ({
				...db.products.find((item) => item.id === cartItem.id),
				amount: cartItem.amount
			}));
		},
	},

	Mutation: {
		addCart: (parent, { id }, { db }, info) => {
			if (!id) new Error('상품 id가 없어요!');
			const targetProduct = db.products.find((item: any) => item.id === id);
			if (!targetProduct) { throw new Error('상품이 없습니다'); }

			const existCartIndex = db.cart.findIndex(item => item.id === id);
			if (existCartIndex > -1) {
				const newCartItem = {
					id,
					amount: db.cart[existCartIndex].amount + 1
				}
				setJSON(db.cart);
				db.cart.splice(existCartIndex, 1, newCartItem);
				return newCartItem;
			}

			const newItem = {
				id,
				amount: 1,
			}

			db.cart.push(newItem);
			setJSON(db.cart);
			return newItem;
		},
		updateCart: (parent, { id, amount }, { db }, info)  => {
			const existCartIndex = db.cart.findIndex(item => item.id === id);
			if (existCartIndex < 0) {
				throw new Error('해당하는 데이터가 없습니다!');
			}
			const newCartItem = {
				id,
				amount,
			};
			db.cart.splice(existCartIndex, 1, newCartItem);
			setJSON(db.cart);
			return newCartItem;
		},
		deleteCart: (parent, { id }, { db }, info) => {
			const existCartIndex = db.cart.findIndex(item => item.id === id);
			if (existCartIndex < 0) {
				throw new Error('해당하는 데이터가 없습니다!');
			}
			db.cart.splice(existCartIndex, 1);
			setJSON(db.cart);
			return id;
		},
		executePay: (parent, { ids }, { db }, info) => {
			const newCartData = db.cart.filter(cartItem => !ids.includes(cartItem.id));
			if (
				newCartData.some(item => {
					const product = db.products.find((product: any) => product.id === item.id);
					return !product?.createdAt;
				})
			)
				throw new Error('삭제된 상품이 있어 결제를 진행할 수 었습니다!');
			db.cart = newCartData;
			setJSON(db.cart);
			return ids;
		},
	},
	CartItem: {
		product: (cartItem, args, { db }) => db.products.find((product: any) => product.id === cartItem.id),
	}
}

export default cartResolver;