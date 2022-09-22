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
    console.log(this.model.students);
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
    document.querySelectorAll('input[name="sort-op_dir"]').forEach((el) => {
      el.addEventListener("change", () => {
        this.model.settings.sortDir = el.value;
        this.model._SortStudents();
        this.view._ShowStudents(this.model.studentsInDisplay);
        document.querySelectorAll("article .btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            this.view._OpenPopUp(this.model.students, Number(btn.dataset.studId));
          });
        });
      });
    });
    document.querySelectorAll('input[name="sort_option"]').forEach((el) => {
      el.addEventListener("change", () => {
        this.model.settings.sortBy = el.value;
        this.model._SortStudents();
        this.view._ShowStudents(this.model.studentsInDisplay);
        document.querySelectorAll("article .btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            this.view._OpenPopUp(this.model.students, Number(btn.dataset.studId));
          });
        });
      });
    });
    document.querySelectorAll('input[name="filter_opt"]').forEach((el) => {
      el.addEventListener("change", () => {
        this.model.settings.filterBy = el.value;
        this.model._FilterStudents();
        this.view._ShowStudents(this.model.studentsInDisplay);
        document.querySelectorAll("article .btn").forEach((btn) => {
          btn.addEventListener("click", () => {
            this.view._OpenPopUp(this.model.students, Number(btn.dataset.studId));
          });
        });
      });
    });
    document.querySelector("input[name='search']").addEventListener("input", (e) => {
      this.model._SearchStudents(e.target.value);
      this.view._ShowStudents(this.model.studentsInDisplay);
      document.querySelectorAll("article .btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          this.view._OpenPopUp(this.model.students, Number(btn.dataset.studId));
        });
      });
    });
  }
}
