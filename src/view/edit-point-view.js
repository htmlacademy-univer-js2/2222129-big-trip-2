import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { DESTINATIONS } from '../mock/point.js';
import { OFFERS , OFFERS_BY_TYPE } from '../mock/offers.js';
import { convertPointDateForEditForm, capitalizeFirstLetter, isSubmitDisabledByDate } from '../utils/task.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const createDestionationsOptionsTemplate = (destinations) => destinations.map((destination) => `<option value="${destination.name}"></option>`).join('\n');

const createAvailableOptionsTemplate = (pointType, offers) => {
  const availableOffersId = OFFERS_BY_TYPE.find((item) => (item.type === pointType)).offers;

  const allOffers = availableOffersId.map((offer) => OFFERS.find((item) => item.id === offer));

  return allOffers.map((offer) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.split(' ').pop()}-${offer.id}" type="checkbox" name="event-offer-${offer.title.split(' ').pop()}" ${offers.includes(offer.id) ? 'checked' : ''}>
  <label class="event__offer-label" for="event-offer-${offer.title.split(' ').pop()}-${offer.id}">
    <span class="event__offer-title">${offer.title}</span>
    &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`).join('\n');
};

const createDestinationDescriptionTemplate = (destinations, pointName) => destinations.find((it) => it.name === pointName).description;


const createPhotosListTemplate = (pictures) => (`<div class="event__photos-container">
    <div class="event__photos-tape">
    ${pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo">`).join('\n')}
    </div>
    </div>`);

const createPointEditTemplate = (point) => {
  const {basePrice, selectedDestination, startDate, endDate, type, offers} = point;

  return (
    `<li class="trip-events__item">
     <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>
              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
          ${capitalizeFirstLetter(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${selectedDestination.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${createDestionationsOptionsTemplate(DESTINATIONS)}
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${convertPointDateForEditForm(startDate)}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${convertPointDateForEditForm(endDate)}">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabledByDate(startDate, endDate) ? '' : 'disabled'}>Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
          ${createAvailableOptionsTemplate(type, offers)}
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${createDestinationDescriptionTemplate(DESTINATIONS, selectedDestination.name)}</p>
          ${(!selectedDestination.pictures) ? '' : createPhotosListTemplate(selectedDestination.pictures)}
        </section>
      </section>
    </form>
    </li>`
  );
};
export default class PointEditView extends AbstractStatefulView {

  #startDatepicker = null;
  #endDatepicker = null;

  constructor(point) {
    super();
    this._state = PointEditView.parsePointToState(point);
    this.#setInnerHandlers();
    this.#setStartDatepicker();
    this.#setEndDatepicker(this._state.startDate);
  }

  get template() {
    return createPointEditTemplate(this._state);
  }

  removeElement = () => {
    super.removeElement();

    if (this.#startDatepicker) {
      this.#startDatepicker.destroy();
      this.#startDatepicker = null;
    }

    if (this.#endDatepicker) {
      this.#endDatepicker.destroy();
      this.#endDatepicker = null;
    }

  };

  reset = (point) => {
    this.updateElement(
      PointEditView.parsePointToState(point),
    );
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setPointSaveHandler(this._callback.pointSave);
    this.setPointRollUpHandler(this._callback.pointRollUp);
    this.#setStartDatepicker();
    this.#setEndDatepicker();
  };

  setPointRollUpHandler = (callback) => {
    this._callback.pointRollUp = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#pointRollUpHandler);
  };

  setPointSaveHandler = (callback) => {
    this._callback.pointSave = callback;
    this.element.querySelector('form').addEventListener('submit', this.#pointSaveHandler);
  };

  #setStartDatepicker = () => {
    this.#startDatepicker = flatpickr(
      this.element.querySelector('[name = "event-start-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        onChange: this.#startDateChangeHandler
      },
    );
  };

  #setEndDatepicker = () => {
    const startDate = this._state.startDate;
    this.#endDatepicker = flatpickr(
      this.element.querySelector('[name = "event-end-time"]'),
      {
        enableTime: true,
        dateFormat: 'd/m/y H:i',
        'time_24hr': true,
        onChange: this.#endDateChangeHandler,
        disable: [
          function(date) {
            return date < startDate;
          }
        ]
      },
    );
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationToggleHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#typeToggleHandler);
    this.element.querySelector('.event__available-offers').addEventListener('click', this.#offerToggleHandler);
  };

  #pointRollUpHandler = (evt) => {
    evt.preventDefault();
    this._callback.pointRollUp();
  };

  #pointSaveHandler = (evt) => {
    evt.preventDefault();
    this._callback.pointSave(PointEditView.parseStateToPoint(this._state));
  };

  #destinationToggleHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.value !== '') {
      this.updateElement({
        selectedDestination: DESTINATIONS.find((item) => (item.name === evt.target.value)),
      });
    }

  };

  #typeToggleHandler = (evt) => {
    if (!evt.target.matches('input[name=event-type]')) {
      return;
    }

    const typeValue = evt.target.value;

    evt.preventDefault();

    this.updateElement({
      type: typeValue,
      offers: [],
      availableOffersId: OFFERS_BY_TYPE.find((item) => (item.type === typeValue)).offers
    });
  };

  #offerToggleHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName.toLowerCase() !== 'label') {
      return;
    }

    const selectedOffers = this._state.offers;
    const clickedOffer = parseInt((evt.target.htmlFor).match(/\d+/g), 10);
    const clickedOfferId = selectedOffers.indexOf(clickedOffer);

    if (clickedOfferId === -1) {
      selectedOffers.push(clickedOffer);
    } else {
      selectedOffers.splice(clickedOfferId, 1);
    }
    const updatedSelectedOffers = selectedOffers;

    this.updateElement({
      offers: updatedSelectedOffers
    });
  };

  #startDateChangeHandler = ([userStartDate]) => {
    this.updateElement({
      startDate: userStartDate,
    });
  };

  #endDateChangeHandler = ([userEndDate]) => {
    this.updateElement({
      endDate: userEndDate,
    });
  };


  static parsePointToState = (point) => ({...point,
    selectedDestination: DESTINATIONS.find((item) => (item.id === point.destination)),
    availableOffersId: OFFERS_BY_TYPE.find((item) => (item.type === point.type)).offers,
    selectedOffers: point.offers
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    point.destination = point.selectedDestination.id;

    delete point.selectedDestination;
    delete point.availableOffersId;

    return point;
  };

}
