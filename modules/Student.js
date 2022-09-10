"use strict";

export default class Student {
  constructor() {
    this.firstName = null;
    this.middleName = null;
    this.lastName = null;
    this.nickName = null;
    this.imageSrc = null;
    this.gender = null;
    this.house = null;
  }

  _CleanInitialData(fullName = null) {
    if (fullName) {
      let fullNameArr = fullName.split(" ");
      while (fullNameArr.includes("")) {
        fullNameArr.splice(fullNameArr.indexOf(""), 1);
      }
      fullNameArr.forEach((el, i) => {
        el = el.toLowerCase();
        el = el[0].toUpperCase() + el.substring(1);
        fullNameArr[i] = el;
      });
      let output = this._FindNickName(fullNameArr);
      return output.join(" ");
    }
  }

  _FindFirstName(fullName) {
    let cleanedName = this._CleanInitialData(fullName);
    // console.log(cleanedName);
    if (cleanedName.includes(" ")) {
      this.firstName = cleanedName.substring(0, cleanedName.indexOf(" "));
    } else {
      this.firstName = cleanedName;
    }
  }

  _FindMiddleName(fullName) {
    let cleanedName = this._CleanInitialData(fullName);
    if (cleanedName.split(" ").length > 2) {
      this.middleName = cleanedName.substring(cleanedName.indexOf(" ") + 1, cleanedName.lastIndexOf(" "));
    }
  }

  _FindLastName(fullName) {
    let cleanedName = this._CleanInitialData(fullName);
    if (cleanedName.includes(" ")) {
      this.lastName = cleanedName.substring(cleanedName.lastIndexOf(" ") + 1);
    }
  }

  _FindNickName(cleanedNameArr) {
    cleanedNameArr.forEach((el, i) => {
      if (el.includes('"')) {
        this.nickName = cleanedNameArr.splice(cleanedNameArr.indexOf(el), 1).toString();
        this.nickName = this.nickName.substring(1, this.nickName.length - 1);
        this.nickName = this.nickName[0].toUpperCase() + this.nickName.substring(1);
      }
    });
    return cleanedNameArr;
  }

  _FindImageSrc() {
    this.imageSrc;
  }

  _FindHouse(house) {
    this.house = house.trim().toLowerCase();
    this.house = this.house[0].toUpperCase() + this.house.substring(1);
  }

  _FindGender(gender) {
    this.gender = gender.trim();
    this.gender = this.gender[0].toUpperCase() + this.gender.substring(1);
  }
}