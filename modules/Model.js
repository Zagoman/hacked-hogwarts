"use strict";

import Student from "./Student.js";

export default class Model {
  constructor() {
    this.students = [];
    this._Init();
  }

  _Init() {
    console.log("model instanciated");
  }

  async _loadJSON(url) {
    const res = await fetch(url);
    const jsonData = await res.json();

    await this._PopulateStudents(jsonData);
    await this.students.forEach((stud) => {
      stud._FindImageSrc(this.students);
    });
  }

  _PopulateStudents(data) {
    data.forEach((entry, i) => {
      let student = new Student(i);
      student._FindFirstName(entry.fullname);
      student._FindLastName(entry.fullname);
      student._FindMiddleName(entry.fullname);
      student._FindHouse(entry.house);
      student._FindGender(entry.gender);
      this.students.push(student);
    });
  }
}
