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
  }

  _GetSortingOpt() {
    console.log("get sorting opt");
  }
}
