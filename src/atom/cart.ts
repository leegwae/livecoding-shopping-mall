import { atom, selectorFamily } from 'recoil';

const cartListState = atom<Map<string, number>>({
	key: 'CartList',
	default: new Map(),
});

export const cartItemAmountQuery = selectorFamily<number | undefined, string>({
	key: 'CartItemQuery',
	get: (cartItemId: string) => ({ get }) => {
		return get(cartListState).get(cartItemId)
	},
	set: (cartItemId: string) => ({ get, set }, newValue) => {
		if (typeof newValue === 'number') {
			const newCartList = new Map(get(cartListState));
			newCartList.set(cartItemId, newValue);
			set(cartListState, newCartList);
		}
	}
});
