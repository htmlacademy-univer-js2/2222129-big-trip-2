import { render, replace } from '../framework/render.js';
import EmptyListView from '../view/empty-list-view.js';
import PointEditView from '../view/edit-point-view.js';
import PointListView from '../view/point-list-view.js';
import PointSortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';

export default class RoutePresenter {
  #routeContainer = null;
  #pointsModel = null;

  #pointListComponent = new PointListView();

  #routePoints = [];

  init = (routeContainer, pointsModel) => {
    this.#routeContainer = routeContainer;
    this.#pointsModel = pointsModel;
    this.#routePoints = [...this.#pointsModel.points];

    if (this.#routePoints.length === 0) {
      render(new EmptyListView(), this.#routeContainer);
    } else {
      render(new PointSortView(),this.#routeContainer);
      render(this.#pointListComponent, this.#routeContainer);
      for (let i = 0; i < this.#routePoints.length; i++) {
        this.#renderPoint(this.#routePoints[i]);
      }
    }
  };

  #renderPoint = (point) => {
    const pointComponent = new PointView(point);
    const pointEditComponent = new PointEditView(point);

    const replacePointToEditForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceEditFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceEditFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    pointComponent.setEditRollUpHandler(() => {
      replacePointToEditForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setPointRollUpHandler(() => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setPointSaveHandler(() => {
      replaceEditFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(pointComponent, this.#pointListComponent.element);
  };
}
