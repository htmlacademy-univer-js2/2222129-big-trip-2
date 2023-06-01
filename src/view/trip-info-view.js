import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';

const addOffersPrices = (pointType, pointOffers, allOffers) => {

  const allOffersForType = allOffers.find((item) => item.type === pointType).offers;

  const selectedOfferPrices = pointOffers.map((offer) => allOffersForType.find((item) => item.id === offer).price);

  return selectedOfferPrices.reduce((sum, price) => sum + price, 0);

};

const addDestinationName = (pointDestination, allDestinations) => allDestinations.find((item) => item.id === pointDestination).name;

const getTripDestinationNames = (points) => {

  const tripDestinationNames = points.map((point) => point.destinationName);

  const uniqueNames = Array.from(new Set(tripDestinationNames));

  switch (uniqueNames.length) {
    case 1:
      return `${uniqueNames[0]}`;
    case 2:
      return `${uniqueNames[0]} &mdash; ${uniqueNames[1]}`;
    case 3:
      return `${uniqueNames[0]} &mdash; ${uniqueNames[1]} &mdash; ${uniqueNames[2]}`;
    default:
      return `${uniqueNames[0]} &mdash; ... &mdash;${uniqueNames[uniqueNames.length - 1]}`;
  }

};

const getTripPrice = (points) => {

  const totalBasePrice = points.reduce((total, point) => total + point.basePrice, 0);
  const totalOffersPrice = points.reduce((total, point) => total + point.offerPrices, 0);

  return totalBasePrice + totalOffersPrice;
};

const getTripDates = (points) => {

  const startTripDate = points[0].startDate;
  const endTripDate = points[points.length - 1].endDate;

  if (dayjs(startTripDate).month() === dayjs(endTripDate).month()) {
    return `${dayjs(startTripDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(endTripDate).format('DD')}`;
  }

  return `${dayjs(startTripDate).format('MMM D')}&nbsp;&mdash;&nbsp;${dayjs(endTripDate).format('MMM D')}`;

};

const createTripInfoTemplate = (points, allOffers, allDestinations) => {

  const tripPoints = points.map((point) => ({...point, offerPrices: addOffersPrices(point.type, point.offers, allOffers), destinationName: addDestinationName(point.destination, allDestinations)}));

  return (
    `<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${getTripDestinationNames(tripPoints)}</h1>

    <p class="trip-info__dates">${getTripDates(tripPoints)}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${getTripPrice(tripPoints)}</span>
  </p>
</section>`
  );
};

export default class TripInfoView extends AbstractView {
  #points = null;
  #allOffers = null;
  #allDestinations = null;

  constructor(points, allOffers, allDestinations) {
    super();
    this.#points = points;
    this.#allOffers = allOffers;
    this.#allDestinations = allDestinations;
  }

  get template() {

    return createTripInfoTemplate(this.#points, this.#allOffers, this.#allDestinations);
  }

}
