"use strict";

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this._Init();
  }

  _Init() {
    console.log("Controller instanciated");
    this.model.students.forEach((student) => this.model.studentsInDisplay.push(student));
    this.model._SortStudents();
    this.view._ShowStudents(this.model.studentsInDisplay, this.view.HTML.studentsParentNode);
    this._InitiateEventListeners();
  }

  _GetSortingOpt() {
    console.log("get sorting opt");
  }

  _InitiateEventListeners() {
    document.querySelector(".sort_trigger").addEventListener("click", this.view._HandleOptionsPopup);
    document.querySelector(".filter_trigger").addEventListener("click", this.view._HandleOptionsPopup);
    document.querySelectorAll("article .btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.view._OpenPopUp(this.model.students, Number(btn.dataset.studId));
      });
    });
  }
}
