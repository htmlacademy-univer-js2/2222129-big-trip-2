import { nanoid } from 'nanoid';
import { generateDates } from '../utils/task';
import { getRandomInteger } from '../utils/common';
import { TYPES } from './const';
import { OFFERS } from './offers';

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


const generateType = () => {

  const randomIndex = getRandomInteger(0, TYPES.length - 1);

  return TYPES[randomIndex];
};

export const generatePoint = () => {
  const {startDate, endDate} = generateDates();

  return ({
    id: nanoid(),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    startDate: startDate,
    endDate:  endDate,
    destination: getRandomInteger(1, DESTINATIONS.length),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    offers: [... new Set(Array.from({length: getRandomInteger(0, OFFERS.length)}, () => getRandomInteger(1, OFFERS.length - 1)))],
    type: generateType(),
  });
};

export {DESTINATIONS};
