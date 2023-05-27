import { render } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointListView from '../view/point-list-view.js';
import PointSortView from '../view/sort-view.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { SortType } from '../mock/const.js';
import { sortPointsByPrice, sortPointsByDuration, sortPointsByDate } from '../utils/sort.js';

export default class RoutePresenter {
  #routeContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();
  #sortComponent = new PointSortView();
  #emptyListComponent = new EmptyListView();

  #routePoints = [];
  #pointPresenter = new Map();
  #currentSortType = SortType.DEFAULT;
  #initialRoutePoints = [];

  constructor(routeContainer, pointsModel) {
    this.#routeContainer = routeContainer;
    this.#pointsModel = pointsModel;
  }

  init = () => {
    this.#routePoints = [...this.#pointsModel.points].sort(sortPointsByDate);
    this.#initialRoutePoints = [...this.#pointsModel.points];
    this.#renderPointList();
  };

  #handleModeSwitch = () => {
    this.#pointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#routePoints = updateItem(this.#routePoints, updatedPoint);
    this.#initialRoutePoints = updateItem(this.#initialRoutePoints, updatedPoint);
    this.#pointPresenter.get(updatedPoint.id).init(updatedPoint);
  };

  #sortPoints = (sortType) => {

    switch (sortType) {
      case SortType.PRICE:
        this.#routePoints.sort(sortPointsByPrice);
        break;
      case SortType.TIME:
        this.#routePoints.sort(sortPointsByDuration);
        break;
      default:
        this.#routePoints.sort(sortPointsByDate);
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPointList();
  };

  #renderSort = () => {
    render(this.#sortComponent,this.#routeContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderEmptyList = () => {
    render(this.#emptyListComponent, this.#routeContainer);
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#pointListComponent.element, this.#handlePointChange, this.#handleModeSwitch);
    pointPresenter.init(point);
    this.#pointPresenter.set(point.id, pointPresenter);
  };

  #renderPoints = (from, to) => {
    this.#routePoints.slice(from, to).forEach((point) => this.#renderPoint(point));
  };

  #renderPointList = () => {
    if (this.#routePoints.length === 0) {
      this.#renderEmptyList();
    } else {
      this.#renderSort();
      render(this.#pointListComponent, this.#routeContainer);
      this.#renderPoints(0, this.#routePoints.length);
    }
  };

  #clearPointList = () => {
    this.#pointPresenter.forEach((presenter) => presenter.destroy());
    this.#pointPresenter.clear();
  };

}
