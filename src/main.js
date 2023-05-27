import { RenderPosition, render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import PointFilterView from './view/filter-view.js';
import RoutePresenter from './presenter/route-presenter.js';
import TripInfoView from './view/trip-info-view.js';

const headerElement = document.querySelector('.page-header');
const mainElement = document.querySelector('.page-body__page-main');
const tripMainElement = document.querySelector('.trip-main');
const tripControlsElement = headerElement.querySelector('.trip-controls__filters');
const tripEventsElement = mainElement.querySelector('.trip-events');

const routePresenter = new RoutePresenter();
const pointsModel = new PointsModel();

render(new TripInfoView(), tripMainElement, RenderPosition.AFTERBEGIN);
render(new PointFilterView(), tripControlsElement);

routePresenter.init(tripEventsElement, pointsModel);

