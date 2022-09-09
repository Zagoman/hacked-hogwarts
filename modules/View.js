"use strict";

export default class View {
  constructor() {
    this.HTML = {
      studentsParentNode: null,
      studentTemplate: null,
    };
    this._Init();
  }

  _Init() {
    console.log("view instanciated");
    this.HTML.studentsParentNode = document.querySelector("#students");
    this.HTML.studentTemplate = document.querySelector("#student_temp").content;
  }

  _ShowStudents(students, parentNode, template) {
    students.forEach((student) => {
      let clone = template.cloneNode(true);

      parentNode.append(clone);
    });
  }

  _UpdateUI() {
    console.log("updateUI");
  }
}
