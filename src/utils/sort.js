import dayjs from 'dayjs';

const sortPointsByPrice = (pointA, pointB) => pointB.basePrice - pointA.basePrice;

const sortPointsByDuration = (pointA, pointB) => {
  const durationA = Math.ceil(pointA.endDate.diff(pointA.startDate, 'minute', true));
  const durationB = Math.ceil(pointB.endDate.diff(pointB.startDate, 'minute', true));

  return durationB - durationA;
};

const sortPointsByDate = (pointA, pointB) => dayjs(pointA.startDate) - dayjs(pointB.startDate);

export {sortPointsByPrice, sortPointsByDuration, sortPointsByDate};
