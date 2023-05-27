import { render, replace, remove } from '../framework/render.js';
import PointEditView from '../view/edit-point-view.js';
import PointView from '../view/point-view.js';
import { UserAction, UpdateType } from '../mock/const.js';
import { isDatesEqual } from '../utils/task.js';

const Mode = {
  DEFAULT: 'default',
  EDITING: 'editing'
};

export default class PointPresenter {
  #pointListContainer = null;
  #changeData = null;
  #switchMode = null;

  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;

  constructor(pointListContainer, changeData, switchMode) {
    this.#pointListContainer = pointListContainer;
    this.#changeData = changeData;
    this.#switchMode = switchMode;
  }

  init = (point) => {
    this.#point = point;

    const previousPointComponent = this.#pointComponent;
    const previousPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new PointEditView(point);

    this.#pointComponent.setEditRollUpHandler(this.#handleEditClick);
    this.#pointEditComponent.setPointRollUpHandler(this.#handlePointClick);
    this.#pointEditComponent.setPointSaveHandler(this.#handlePointSave);
    this.#pointEditComponent.setDeleteClickHandler(this.#handlePointDelete);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

    if ((previousPointComponent === null) || (previousPointEditComponent === null)) {
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, previousPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, previousPointEditComponent);
    }

    remove(previousPointComponent);
    remove(previousPointEditComponent);

  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #replacePointToEditForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#switchMode();
    this.#mode = Mode.EDITING;
  };

  #replaceEditFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceEditFormToPoint();
    }
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_POINT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite}
    );
  };

  #handleEditClick = () => {
    this.#replacePointToEditForm();
  };

  #handlePointClick = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceEditFormToPoint();
  };

  #handlePointSave = (update) => {
    const isMinorUpdate = isDatesEqual(this.#point.startDate, update.startDate);

    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.PATCH : UpdateType.MINOR,
      update,
    );
    this.#replaceEditFormToPoint();
  };

  #handlePointDelete = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point,
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
