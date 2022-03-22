import { v4 as uuid } from 'uuid';
import { DBField, writeDB } from './src/dbController';
import getRandomInt from './src/util/getRandomInt';

const getRandomPrice = (min: number, max: number) => {
  return Math.floor(getRandomInt(min, max) / 1000) * 1000;
}

const db = Array.from({ length: 100 }).map((_, i) => ({
  id: uuid(),
  imageUrl: `https://picsum.photos/id/${i + 25}/200/150`,
  price: getRandomPrice(10000, 60000),
  title: `임시상품_${i}`,
  description: `임시상세내용${i}`,
  createdAt: 1642424841540 + 1000 * 60 * 60 * 5 * i,
}));

writeDB(DBField.PRODUCTS, db);