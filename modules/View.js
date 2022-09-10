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
      clone.querySelector("h3[data-name-order = first]").textContent = student.firstName;
      clone.querySelector("p[data-name-order = middle]").textContent = student.middleName;
      clone.querySelector("p[data-name-order = last]").textContent = student.lastName;
      clone.querySelector("p[data-name-order = nick_name]").textContent = student.nickName;
      clone.querySelector("p[data-house = house]").textContent = student.house;

      parentNode.append(clone);
    });
  }

  _UpdateUI() {
    console.log("updateUI");
  }
}
