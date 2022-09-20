"use strict";

import Info from "./Info.js";
import Student from "./Student.js";

export default class Model {
  constructor() {
    this.students = [];
    this.expelledStudents = [];
    this.studentsInDisplay = [];
    this.settings = {
      filterBy: null,
      sortBy: "firstName",
      sortDir: "a-z",
    };
    this._Init();
  }

  _Init() {
    console.log("model instanciated");
    this.info = new Info(this);
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

  _FilterStudents() {
    let filteredStudents = this.students.filter((student) => {
      switch (this.settings.filterBy) {
        case null:
        case "none":
          return true;
          break;
        case "gryffindor":
        case "slytherin":
        case "hufflepuff":
        case "ravenclaw":
          if (student.house.toLowerCase() === this.settings.filterBy) return true;
          break;
        case "prefects":
          if (student.isPrefect) return true;
          break;
        case "inquisition":
          if (student.isInquisition) return true;
          break;
        case "expelled":
          if (student.isExpelled) return true;
          break;
      }
      return false;
    });

    this._UpdateVisibleStudents(filteredStudents);
    this._SortStudents();
  }

  _SortStudents() {
    let multiplier;
    if (this.settings.sortDir === "a-z") {
      multiplier = 1;
    } else if (this.settings.sortDir === "z-a") {
      multiplier = -1;
    }
    this.studentsInDisplay.sort((a, b) => {
      if (a[this.settings.sortBy] > b[this.settings.sortBy]) {
        return multiplier * 1;
      } else {
        return multiplier * -1;
      }
    });
    this._UpdateVisibleStudents(this.studentsInDisplay);
  }

  _UpdateVisibleStudents(students) {
    this.studentsInDisplay = students;
    this.info._ResetInfo();
    this._UpdateInfo();
    console.log(this.info);
  }

  _UpdateInfo() {
    this.info._GetGeneralInfo();
    this.info._GetHouseInfo();
  }
}
