import dayjs from 'dayjs';

const TYPES = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFER_TITLES = [
  'Add breakfast',
  'Add luggage',
  'Add late check-out',
  'Room with a beautiful view',
  'Order a taxi',
  'Switch to comfort',
  'Switch to business',
  'Rent a car',
  'Upgrade to business class',
  'Upgrade to Space+ Seat',
];

const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const SortType = {
  DEFAULT: 'day',
  TIME: 'time',
  PRICE: 'price',
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const NEW_POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: 1,
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

export {TYPES, OFFER_TITLES, NEW_POINT, FilterType, SortType, UserAction, UpdateType};
