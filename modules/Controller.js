"use strict";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this._Init();
  }

  _Init() {
    console.log("Controller instanciated");
    this.view._ShowStudents(this.model.students, this.view.HTML.studentsParentNode, this.view.HTML.studentTemplate);
    this._InitiateEventListeners();
  }

  _GetSortingOpt() {
    console.log("get sorting opt");
  }

  _InitiateEventListeners() {
    document.querySelector(".sort_trigger").addEventListener("click", this.view._HandleOptionsPopup);
    document.querySelector(".filter_trigger").addEventListener("click", this.view._HandleOptionsPopup);
  }
}
