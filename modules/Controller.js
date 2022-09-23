"use strict";

export default class Controller {
  //Receives Model and View so it can communicate with both, without having Model a and view communicating with each other
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.observer = null; //This observer is going to be populated by a MutationObserver to check when the 'see more' popup is open
    this._Init(); //calls Init function within controller
  }

  _Init() {
    console.log("Controller instanciated");

    // Update studentsInDisplay array
    this.model.students.forEach((student) => this.model.studentsInDisplay.push(student));

    // Sort students right away
    this.model._SortStudents();

    // Show students in a list, by sending the students that should be displayer, and the parent node where they should be appended to
    this.view._ShowStudents(this.model.studentsInDisplay, this.view.HTML.studentsParentNode);

    // Initiate Event handlers and start the Observer
    this._InitiateEventListeners();
    this._ObservePopup();
  }

  _InitiateEventListeners() {
    this.view.HTML.sortTrigger.addEventListener("click", this.view._HandleOptionsPopup);
    this.view.HTML.filterTrigger.addEventListener("click", this.view._HandleOptionsPopup);
    this.view.HTML.infoTrigger.addEventListener("click", this.view._HandleOptionsPopup);
    window.addEventListener("click", (e) => {
      if (
        this.view.HTML.sortTrigger.parentElement.dataset.popup === "open" ||
        this.view.HTML.filterTrigger.parentElement.dataset.popup === "open" ||
        this.view.HTML.infoTrigger.parentElement.dataset.popup === "open"
      ) {
        if (
          !this.view.HTML.filterTrigger.parentElement.contains(e.target) &&
          !this.view.HTML.sortTrigger.parentElement.contains(e.target) &&
          !this.view.HTML.infoTrigger.parentElement.contains(e.target)
        ) {
          this.view._CloseOptions();
        }
      }
    });
    this._PopupEvent();
    document.querySelectorAll('input[name="sort-op_dir"]').forEach((el) => {
      el.addEventListener("change", () => {
        this.model.settings.sortDir = el.value;
        this.model._SortStudents();
        this.view._ShowStudents(this.model.studentsInDisplay);
        this._PopupEvent();
      });
    });
    document.querySelectorAll('input[name="sort_option"]').forEach((el) => {
      el.addEventListener("change", () => {
        this.model.settings.sortBy = el.value;
        this.model._SortStudents();
        this.view._ShowStudents(this.model.studentsInDisplay);
        this._PopupEvent();
      });
    });
    document.querySelectorAll('input[name="filter_opt"]').forEach((el) => {
      el.addEventListener("change", () => {
        this.model.settings.filterBy = el.value;
        // console.log(el.value);
        this.model._FilterStudents();
        this.view._ShowStudents(this.model.studentsInDisplay);
        this._PopupEvent();
      });
    });
    document.querySelector("input[name='search']").addEventListener("input", (e) => {
      this.model._SearchStudents(e.target.value);
      this.view._ShowStudents(this.model.studentsInDisplay);
      this._PopupEvent();
    });
  }

  _PopupEvent() {
    document.querySelectorAll("article .btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (this.model.settings.filterBy !== "expelled") {
          this.view._OpenPopUp(this.model.students, Number(btn.dataset.studId));
        } else {
          this.view._OpenPopUp(this.model.expelledStudents, Number(btn.dataset.studId));
        }
      });
    });
  }

  _ObservePopup() {
    const targetNode = this.view.HTML.popupParentNode;
    const config = { childList: true };

    // Set a callback to when a mutation on the popup parent node is observed
    const callback = (mutationList, observer) => {
      if (mutationList[0].addedNodes.length > 0) {
        let currentStudent = this.model.students[Number(this.model.students.findIndex(findStudent))];
        // !Event Listeners when popup is open

        // Expell btn event listener
        targetNode.querySelector("a[data-action='expell']").addEventListener("click", (e) => {
          this.model._ExpellStudent(currentStudent);
          this.view.HTML.popupParentNode.firstElementChild.remove();
          this.view._ShowStudents(this.model.studentsInDisplay);
          this._PopupEvent();
        });

        // Prefect btn event listener
        targetNode.querySelector("a[data-action='prefect']").addEventListener("click", (e) => {
          this.model._MakePrefect(currentStudent);
          this.view.HTML.popupParentNode.firstElementChild.remove();
          this.model._FilterStudents();
          this.view._ShowStudents(this.model.studentsInDisplay);
          this._PopupEvent();
        });

        // Squad btn event listener
        targetNode.querySelector("a[data-action='squad']").addEventListener("click", (e) => {
          this.model._RecruitToSquad(currentStudent);
          this.view.HTML.popupParentNode.firstElementChild.remove();
          this.model._FilterStudents();
          this.view._ShowStudents(this.model.studentsInDisplay);
          this._PopupEvent();
        });
      }
    };

    // callback to find the right student's index
    function findStudent(student) {
      return student.id == targetNode.dataset.studId;
    }

    // Instantiate Mutation Observer and set to Controllers object scope, in case I want to stop observing the node
    this.observer = new MutationObserver(callback);

    // Start observing
    this.observer.observe(targetNode, config);
  }
}
