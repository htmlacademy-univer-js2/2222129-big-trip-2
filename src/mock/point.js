import { nanoid } from 'nanoid';
import { generateDates } from '../utils/task';
import { getRandomInteger, getRandomOffersArray } from '../utils/common';
import { OFFERS_BY_TYPE } from './offers';

const MIN_PRICE = 100;
const MAX_PRICE = 600;

const DESTINATIONS = [
  {
    id: 1,
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Chamonix',
    pictures: [
      {
        src: 'https://placekitten.com/300/200',
        description: 'Chamonix parliament building'
      }
    ]
  },
  {
    id: 2,
    description: 'Paris, is a overcrowded dirty city.',
    name: 'Paris',
    pictures: [
      {
        src: 'https://placekitten.com/300/200',
        description: 'Somewhere in Paris'
      }
    ]
  },
  {
    id: 3,
    description: 'Amsterdam, is a delightful free city',
    name: 'Amsterdam',
  }
];


export const generatePoint = () => {
  const {startDate, endDate} = generateDates();

  const randomOffersIndex = getRandomInteger(0, OFFERS_BY_TYPE.length - 1);

  return ({
    id: nanoid(),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    startDate: startDate,
    endDate:  endDate,
    destination: getRandomInteger(1, DESTINATIONS.length),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: getRandomOffersArray(OFFERS_BY_TYPE[randomOffersIndex].offers),
    type: OFFERS_BY_TYPE[randomOffersIndex].type,
  });
};

export {DESTINATIONS};
