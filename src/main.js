import { RenderPosition, render } from './framework/render.js';
import NewPointButtonView from './view/new-point-btn-view.js';
import FilterModel from './model/filter-model.js';
import PointsModel from './model/points-model.js';
import RoutePresenter from './presenter/route-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import TripInfoView from './view/trip-info-view.js';

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-body__page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = headerElement.querySelector('.trip-controls__filters');
const tripEventsElement = mainElement.querySelector('.trip-events');

const pointsModel = new PointsModel();
const filterModel = new FilterModel();
const routePresenter = new RoutePresenter(tripEventsElement, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsElement, filterModel, pointsModel);
const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  routePresenter.createPoint(handleNewPointFormClose);

  newPointButtonComponent.element.disabled = true;
};


render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(newPointButtonComponent, tripMainElement);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

filterPresenter.init();
routePresenter.init();
