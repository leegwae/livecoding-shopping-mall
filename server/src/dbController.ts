import fs from 'fs';
import { resolve } from 'path';

export enum DBField {
	CART = 'cart',
	PRODUCTS = 'product',
}

const basePath = resolve();

const fileNames = {
	[DBField.CART]: resolve(basePath, 'src/db/cart.json'),
	[DBField.PRODUCTS]: resolve(basePath, 'src/db/product.json')
}

export const readDB = (target: DBField) => {
	try {
		return JSON.parse(fs.readFileSync(fileNames[target], 'utf-8'));
	} catch (err) {
		console.error(err);
	}
} 

export const writeDB = (target: DBField, data: any) => {
	try {
		fs.writeFileSync(fileNames[target], JSON.stringify(data));
	} catch (err) {
		console.error(err);
	}
}