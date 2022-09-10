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
  }

  _PopulateStudents(data) {
    // console.table(data);
    data.forEach((entry) => {
      let student = new Student();
      student._FindFirstName(entry.fullname);
      student._FindLastName(entry.fullname);
      student._FindMiddleName(entry.fullname);
      student._FindImageSrc();
      student._FindHouse(entry.house);
      student._FindGender(entry.gender);
      this.students.push(student);
      // console.log(student);
    });
  }
}
