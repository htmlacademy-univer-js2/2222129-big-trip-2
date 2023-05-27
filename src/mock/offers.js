import { getRandomInteger } from '../utils/common';
import { TYPES, OFFER_TITLES} from './const';

const generateOfferTypes = () => TYPES.map((item) => (
  {
    type: item,
    offers: [... new Set(Array.from({length: getRandomInteger(1, OFFER_TITLES.length)}, () => getRandomInteger(1, OFFER_TITLES.length - 1)))],
  }
));

const generateOffersArray = () => OFFER_TITLES.map((item, index) => (
  {
    id: index + 1,
    title: item,
    price: getRandomInteger(50, 300)
  }
));

const OFFERS = generateOffersArray();
const OFFERS_BY_TYPE = generateOfferTypes();

export {OFFERS, OFFERS_BY_TYPE};
