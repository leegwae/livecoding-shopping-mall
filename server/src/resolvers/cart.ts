import { DBField, writeDB } from '../dbController';
import { Resolver } from './types';
import { Cart } from './types';

const setJSON = (data: Cart) => writeDB(DBField.CART, data);

let cartData = [{ id: '1', amount: 1 }, { id: '2', amount: 2 }];

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
		updateCart: (parent, { id, amount }, context, info)  => {
			const newData = { ...cartData };
			if (!newData[id]) { throw new Error('없는 데이터입니다'); }
	
			const newItem = {
				...newData[id],
				amount,
			};
			newData[id] = newItem;
			cartData = newData;
	
			return newItem;
		},
		deleteCart: (parent, { id }, context, info) => {
			const newData = { ...cartData };
			delete newData[id];
			cartData = newData;

			return id; 
		},
		executePay: (parent, { ids }, context, info) => {
			const newCartdata = cartData.filter(cartItem => !ids.includes(cartItem.id));
			cartData = newCartdata;

			return ids;
		},
	},
	CartItem: {
		product: (cartItem, args, { db }) => db.products.find((product: any) => product.id === cartItem.id),
	}
}

export default cartResolver;