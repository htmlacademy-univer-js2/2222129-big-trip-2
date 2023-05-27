import { isPointPlanned, isPointPassed } from './task';

const FILTER_TYPES = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past'
};

const filter = {
  [FILTER_TYPES.EVERYTHING]: (points) => points.map((point) => point),
  [FILTER_TYPES.FUTURE]: (points) => points.filter((point) => isPointPlanned(point.startDate, point.endDate)),
  [FILTER_TYPES.PAST]: (points) => points.filter((point) => isPointPassed(point.startDate, point.endDate))
};

export {filter};
