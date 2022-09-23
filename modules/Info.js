"use strict";

/**
 * This class holds the information that is going to be displayed in the info pannel.
 * It should use it's methods to update itself everytime the data changes.
 */
export default class Info {
  constructor(model) {
    this.model = model;
    this.generalInfo = {
      totalStuds: 0,
      displayedStuds: 0,
      expelledStuds: 0,
    };
    this.houseInfo = {
      gryffindor: 0,
      slytherin: 0,
      hufflepuff: 0,
      ravenclaw: 0,
    };
  }

  _GetGeneralInfo() {
    this.generalInfo.totalStuds = this.model.students.length;
    this.generalInfo.displayedStuds = this.model.studentsInDisplay.length;
    this.generalInfo.expelledStuds = this.model.expelledStudents.length;
  }

  _GetHouseInfo() {
    let houses = ["gryffindor", "ravenclaw", "hufflepuff", "slytherin"];
    this.model.students.filter((stud) => {
      for (let i = 0; i < houses.length; i++) {
        if (stud.house.toLowerCase() === houses[i]) {
          this.houseInfo[houses[i]]++;
          return true;
        }
      }
      return false;
    });
  }

  _ResetInfo() {
    this.generalInfo = {
      totalStuds: 0,
      displayedStuds: 0,
      expelledStuds: 0,
    };
    this.houseInfo = {
      gryffindor: 0,
      slytherin: 0,
      hufflepuff: 0,
      ravenclaw: 0,
    };
  }
}
