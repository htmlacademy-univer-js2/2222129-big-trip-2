import { getRandomInteger } from '../utils/common';
import {OFFER_TITLES} from './const';

const OFFERS_BY_TYPE = [
  {
    type: 'taxi',
    offers: [6, 7],
  },
  {
    type: 'bus',
    offers: [],
  },
  {
    type: 'train',
    offers: [2, 9],
  },
  {
    type: 'ship',
    offers: [2, 9]
  },
  {
    type: 'drive',
    offers: [8]
  },
  {
    type: 'flight',
    offers: [2, 9, 10]
  },
  {
    type: 'check-in',
    offers: [1, 3, 4]
  },
  {
    type: 'sightseeing',
    offers: []
  },
  {
    type: 'restaurant',
    offers: []
  },

];

const generateOffersArray = () => OFFER_TITLES.map((item, index) => (
  {
    id: index + 1,
    title: item,
    price: getRandomInteger(50, 300)
  }
));

const OFFERS = generateOffersArray();

export {OFFERS, OFFERS_BY_TYPE};
