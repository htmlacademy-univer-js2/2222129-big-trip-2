import AbstractView from '../framework/view/abstract-view.js';
import { capitalizeFirstLetter } from '../utils/task.js';

const createPointFilterTemplate = (filter, isChecked) => {
  const {name} = filter;

  return (
    `<div class="trip-filters__filter">
       <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${capitalizeFirstLetter(name)}</label>
    </div>`
  );
};

const createFiltersTemplate = (filterItems) => {
  const filterPointsTemplate = filterItems
    .map((filter, index) => createPointFilterTemplate(filter, index === 0))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
    ${filterPointsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};
export default class PointFilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createFiltersTemplate(this.#filters);
  }

}
