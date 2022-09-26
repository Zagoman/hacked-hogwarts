"use strict";

import Info from "./Info.js";
import { Student, SuperStudent } from "./Student.js";

export default class Model {
  constructor() {
    this.students = [];
    this.info;
    this.systemHacked = false;
    this.expelledStudents = [];
    this.studentsInDisplay = [];
    this.settings = {
      filterBy: "none",
      sortBy: "firstName",
      sortDir: "a-z",
    };
    this.bloodData = null;
    this._Init();
  }

  _Init() {
    console.log("model instanciated");
    this.info = new Info(this);
  }

  async _LoadBloodData(url) {
    const res = await fetch(url);
    this.bloodData = await res.json();
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
      student._FindBloodStatus(this.bloodData);
      this.students.push(student);
    });
  }

  _FilterStudents() {
    let filteredStudents;
    if (this.settings.filterBy !== "expelled") {
      filteredStudents = this.students.filter((student) => {
        switch (this.settings.filterBy.trim()) {
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
            if (student.isSquad) return true;
            break;
        }
        return false;
      });
    } else {
      filteredStudents = this.expelledStudents;
    }

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

  _SearchStudents(input) {
    console.log("hello");
    let keys;
    const output = this.students.filter((student) => {
      keys = Object.keys(student);
      for (let i = 0; i < keys.length; i++) {
        if (student[keys[i]] && typeof student[keys[i]] === "string") {
          if (student[keys[i]].toLowerCase().includes(input.toLowerCase())) {
            return true;
          }
        }
      }
      return false;
    });
    this._UpdateVisibleStudents(output);
  }

  _UpdateVisibleStudents(students) {
    this.studentsInDisplay = students;
    this.info._ResetInfo();
    this._UpdateInfo();
  }

  _UpdateInfo() {
    this.info._GetGeneralInfo();
    this.info._GetHouseInfo();
  }

  _ExpellStudent(student) {
    let studentName = student.fullName;
    _APP.view._Notify(`${studentName} has been expelled`);
    student.isExpelled = true;
    this.students.splice(this.students.indexOf(student), 1);
    this.studentsInDisplay.splice(this.studentsInDisplay.indexOf(student), 1);
    this.expelledStudents.push(student);
  }

  _MakePrefect(student) {
    const MAX_PER_HOUSE = 2;
    const MAX_PER_GENDER = 1;
    const counter = {
      prefects: 0,
      boy: 0,
      girl: 0,
    };

    student.clickCounter.prefect++;

    for (let i = 0; i < this.students.length; i++) {
      if (this.students[i].house === student.house) {
        if (this.students[i].isPrefect) {
          counter.prefects++;
          counter[this.students[i].gender.toLowerCase()]++;
        }
      }
    }

    if (!student.isPrefect) {
      if (counter.prefects < MAX_PER_HOUSE) {
        if (counter[student.gender.toLowerCase()] < MAX_PER_GENDER) {
          student.isPrefect = true;
          _APP.view._Notify(`${student.fullName} is now a Prefect`);
        } else {
          alert(`There can only be ${MAX_PER_GENDER} ${student.gender.toLowerCase()} as a prefect in ${student.house}`);
        }
      } else {
        alert(`There can only be ${MAX_PER_HOUSE} prefects in ${student.house}`);
      }
    } else {
      student.isPrefect = false;
    }
  }

  async _RecruitToSquad(student) {
    const HOUSE = "slytherin";
    const ACCEPTED_BLOOD_TYPE = "pure-blood";

    if (!student.isSquad) {
      if (student.house.toLowerCase() === HOUSE || student.bloodStatus.toLowerCase() === ACCEPTED_BLOOD_TYPE) {
        student.isSquad = true;
        _APP.view._Notify(`${student.fullName} is now part of Inquisitory Squad`);
      } else {
        alert(`To be part of the Inquisitory Squad you must be from ${HOUSE} or be a ${ACCEPTED_BLOOD_TYPE}`);
      }
    } else {
      student.isSquad = false;
      console.log(student);
    }
  }
}
