"use strict";

/**
 * Each student is going to be an instance of the Student class, which is going to inherit all the properties and methods.
 * The methods in students are set so it modifies the students initial data to the specific data to that student.
 */
class Student {
  constructor(id) {
    this.id = id;
    this.fullName = null;
    this.firstName = null;
    this.middleName = null;
    this.lastName = null;
    this.nickName = null;
    this.imageSrc = null;
    this.gender = null;
    this.house = null;
    this.bloodStatus = null;
    this.isSquad = false;
    this.isPrefect = false;
    this.isExpelled = false;
    this.clickCounter = {
      prefect: 0,
      squad: 0,
    };
  }

  /**
   * The methods are self explanatory
   */

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
      this._FindNickName(fullNameArr);
      this.fullName = fullNameArr.join(" ");
      return this.fullName;
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
    if (this.lastName && this.lastName.includes("-")) {
      this.middleName = this.lastName.substring(0, this.lastName.indexOf("-"));
      this.lastName = this.lastName.substring(this.lastName.indexOf("-") + 1);
      this.lastName = this.lastName[0].toUpperCase() + this.lastName.substring(1);
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

  _FindImageSrc(students) {
    let lastNameCount = 0;
    students.forEach((stud) => {
      if (stud.lastName === this.lastName && stud !== this) {
        lastNameCount++;
      }
    });
    if (lastNameCount > 0) {
      this.imageSrc = `./images/${this.lastName.toLowerCase()}_${this.firstName.toLowerCase()}.png`;
    }
    if (lastNameCount < 1 && this.lastName) {
      this.imageSrc = `./images/${this.lastName.toLowerCase()}_${this.firstName[0].toLowerCase()}.png`;
    }
  }

  _FindHouse(house) {
    this.house = house.trim().toLowerCase();
    this.house = this.house[0].toUpperCase() + this.house.substring(1);
  }

  _FindGender(gender) {
    this.gender = gender.trim();
    this.gender = this.gender[0].toUpperCase() + this.gender.substring(1);
  }

  _FindBloodStatus(data) {
    if (this.lastName) {
      if (data.half.includes(this.lastName) && data.pure.includes(this.lastName)) {
        this.bloodStatus = "Half-blood";
      } else if (!data.half.includes(this.lastName) && data.pure.includes(this.lastName)) {
        this.bloodStatus = "Pure-blood";
      } else if (data.half.includes(this.lastName) && !data.pure.includes(this.lastName)) {
        this.bloodStatus = "Half-muggle";
      } else if (!data.half.includes(this.lastName) && !data.pure.includes(this.lastName)) {
        this.bloodStatus = "Muggle-blood";
      }
    } else {
      this.bloodStatus = "Muggle-blood";
    }
  }
}

class SuperStudent extends Student {
  constructor(id) {
    super(id);
    this.isHacker = true;
  }
}

export { Student, SuperStudent };
