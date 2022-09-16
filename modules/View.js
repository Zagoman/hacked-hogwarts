"use strict";

export default class View {
  constructor() {
    this.HTML = {
      studentsParentNode: null,
      studentTemplate: null,
      popupParentNode: null,
      popupTemplate: null,
      overlay: null,
    };
    this._Init();
  }

  _Init() {
    console.log("view instanciated");
    this.HTML.studentsParentNode = document.querySelector("#students");
    this.HTML.studentTemplate = document.querySelector("#student_temp").content;
    this.HTML.popupParentNode = document.querySelector("#popup_parent");
    this.HTML.popupTemplate = document.querySelector("#popup_temp").content;
    this.HTML.overlay = this.HTML.popupTemplate.querySelector(".overlay");
  }

  _ShowStudents(students, parentNode) {
    // console.log(this);
    students.forEach((student) => {
      let clone = this.HTML.studentTemplate.cloneNode(true);
      clone.querySelector("h3[data-name-order = first]").textContent = student.firstName;
      clone.querySelector("p[data-name-order = middle]").textContent = student.middleName;
      clone.querySelector("p[data-name-order = last]").textContent = student.lastName;
      clone.querySelector("p[data-name-order = nick_name]").textContent = student.nickName;
      clone.querySelector("p[data-house = house]").textContent = student.house;
      clone.querySelector(".btn").dataset.studId = student.id;
      if (student.imageSrc) {
        clone.querySelector("img").src = student.imageSrc;
      }

      if (!student.middleName) {
        clone.querySelector("span[data-label = middle_name]").style.display = "none";
        clone.querySelector("p[data-name-order = middle]").style.display = "none";
      }
      if (!student.lastName) {
        clone.querySelector("span[data-label = last_name]").style.display = "none";
        clone.querySelector("p[data-name-order = last]").style.display = "none";
      }
      if (!student.nickName) {
        clone.querySelector("span[data-label = nick_name]").style.display = "none";
        clone.querySelector("p[data-name-order = nick_name]").style.display = "none";
      }

      this.HTML.studentsParentNode.append(clone);
    });
  }

  _OpenPopUp(students, id) {
    // console.log(this.HTML.overlay);

    console.log(students[id]);
    let clone = this.HTML.popupTemplate.cloneNode(true);
    clone.querySelector("h3[data-name-order = first]").textContent = students[id].firstName;
    clone.querySelector("p[data-name-order = middle]").textContent = students[id].middleName;
    clone.querySelector("p[data-name-order = last]").textContent = students[id].lastName;
    clone.querySelector("p[data-name-order = nick_name]").textContent = students[id].nickName;
    clone.querySelector("p[data-house = house]").textContent = students[id].house;
    clone.querySelector(".btn").dataset.studId = students[id].id;
    if (students[id].imageSrc) {
      clone.querySelector("img").src = students[id].imageSrc;
    }

    if (!students[id].middleName) {
      clone.querySelector("span[data-label = middle_name]").style.display = "none";
      clone.querySelector("p[data-name-order = middle]").style.display = "none";
    }
    if (!students[id].lastName) {
      clone.querySelector("span[data-label = last_name]").style.display = "none";
      clone.querySelector("p[data-name-order = last]").style.display = "none";
    }
    if (!students[id].nickName) {
      clone.querySelector("span[data-label = nick_name]").style.display = "none";
      clone.querySelector("p[data-name-order = nick_name]").style.display = "none";
    }

    clone.querySelector(".overlay").addEventListener("click", (e) => {
      if (e.target.classList.contains("overlay")) {
        // this.HTML.popupParentNode.children;
        this.HTML.popupParentNode.firstElementChild.remove();
      }
    });
    this.HTML.popupParentNode.append(clone);
  }

  _HandleOptionsPopup() {
    if (this.parentNode.dataset.popup === "closed") {
      this.parentNode.dataset.popup = "open";
      let otherElements = document.querySelector("#options").children;
      // console.log(this.parentNode === otherElements);
      for (let i = 0; i < otherElements.length; i++) {
        if (otherElements[i] !== this.parentNode) {
          otherElements[i].dataset.popup = "closed";
        }
      }
    } else {
      this.parentNode.dataset.popup = "closed";
    }
  }

  _UpdateUI() {
    console.log("updateUI");
  }
}
