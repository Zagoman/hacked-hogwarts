"use strict";

import { Student, SuperStudent } from "./Student.js";
export default class Hacker {
  constructor(controller) {
    this.controller = controller;
    this._Init();
  }

  _Init() {
    console.log("YOUR SYSTEM HAS BEEN HACKED");
    this.controller.model._AddStudent = this._InjectAddStudent();
    this.controller.model._ExpellStudent = this._ModiffyExpell();
    this.controller.model._RecruitToSquad = this._ModiffySquadInsertion();
    this._RandomizeBloodStatus();
    this.controller.model._AddStudent();
    this.controller.model._FilterStudents();
    this.controller.view._ShowStudents(this.controller.model.studentsInDisplay);
    this.controller.view._ShowInfo();
    this.controller._PopupEvent();
    console.log(this.controller.model.students);
  }

  _InjectAddStudent() {
    return function () {
      const newStudent = new SuperStudent();
      newStudent.firstName = "Emmanuel";
      newStudent.lastName = "Smith";
      newStudent.nickName = "Em";
      newStudent.house = "Slytherin";
      newStudent.id = this.students.length + this.expelledStudents.length + 1;
      newStudent.bloodStatus = "Pure-blood";
      newStudent.gender = "Boy";
      newStudent.fullName = "Emmanuel Smith";

      this.students.push(newStudent);
    };
  }

  _ModiffyExpell() {
    return function (student) {
      console.log(student instanceof SuperStudent);
      if (student instanceof SuperStudent === false) {
        student.isExpelled = true;
        this.students.splice(this.students.indexOf(student), 1);
        this.studentsInDisplay.splice(this.studentsInDisplay.indexOf(student), 1);
        this.expelledStudents.push(student);
      } else if (student instanceof SuperStudent === true) {
        alert("Student cannot be expelled");
      }
    };
  }

  _ModiffySquadInsertion() {
    return async function (student) {
      const HOUSE = "slytherin";
      const ACCEPTED_BLOOD_TYPE = "pure_blood";

      if (!student.isSquad) {
        if (student.house.toLowerCase() === HOUSE || student.bloodStatus.toLowerCase() === ACCEPTED_BLOOD_TYPE) {
          student.isSquad = true;
          setTimeout(() => {
            student.isSquad = false;
            alert(`${student.fullName} removed from inquisition squad`);
            this._FilterStudents();
            _APP.view._ShowStudents(_APP.model.studentsInDisplay);
            _APP.view._ShowInfo();
            _APP.controller._PopupEvent();
          }, 4000);
        } else {
          alert(`To be part of the Inquisitory Squad you must be from ${HOUSE} or be a ${ACCEPTED_BLOOD_TYPE}`);
        }
      } else {
        student.isSquad = false;
        console.log(student);
      }
    };
  }

  _RandomizeBloodStatus() {
    let randomNumber;

    this.controller.model.students.forEach((student) => {
      randomNumber = Math.floor(Math.random() * 4);
      if (!student instanceof SuperStudent === false) {
        switch (randomNumber) {
          case 0:
            student.bloodStatus = "Half-blood";
            break;
          case 1:
            student.bloodStatus = "Pure-blood";
            break;
          case 2:
            student.bloodStatus = "Half-muggle";
            break;
          case 3:
            student.bloodStatus = "Muggle-blood";
            break;
        }
      }
    });
  }
}
