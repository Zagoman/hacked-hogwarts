"use strict";

export default class View {
  constructor(info) {
    // Give view access to the DOM Elements that are going to be used along the program
    this.HTML = {
      studentsParentNode: null,
      studentTemplate: null,
      popupParentNode: null,
      popupTemplate: null,
      overlay: null,
      filterTrigger: null,
      sortTrigger: null,
      infoTrigger: null,
      expellBtn: null,
      prefectBtn: null,
      squadBtn: null,
      notificationsParent: null,
    };
    this.info = info;
    // Calls view._Init when view is instanciated
    this._Init();
  }

  _Init() {
    console.log("view instanciated");

    // Give the HTML object the elements it should hold
    this.HTML.studentsParentNode = document.querySelector("#students");
    this.HTML.studentTemplate = document.querySelector("#student_temp").content;
    this.HTML.popupParentNode = document.querySelector("#popup_parent");
    this.HTML.popupTemplate = document.querySelector("#popup_temp").content;
    this.HTML.overlay = this.HTML.popupTemplate.querySelector(".overlay");
    this.HTML.filterTrigger = document.querySelector(".filter_trigger");
    this.HTML.sortTrigger = document.querySelector(".sort_trigger");
    this.HTML.infoTrigger = document.querySelector(".info_trigger");
    this.HTML.notificationsParent = document.querySelector(".notifications");
  }

  _ShowStudents(students) {
    // Reset the innerHTML of the Student List so it doesn't add the same students twice.
    this.HTML.studentsParentNode.innerHTML = "";

    // Populate students information on screen
    students.forEach((student) => {
      let clone = this.HTML.studentTemplate.cloneNode(true);
      clone.querySelector("h3[data-name-order = first]").textContent = student.firstName;
      clone.querySelector("p[data-name-order = middle]").textContent = student.middleName;
      clone.querySelector("p[data-name-order = last]").textContent = student.lastName;
      clone.querySelector("p[data-name-order = nick_name]").textContent = student.nickName;
      clone.querySelector("p[data-house = house]").textContent = student.house;
      clone.querySelector(".btn").dataset.studId = student.id;
      clone.querySelector(".banner").src = `./images/graphics/${student.house.toLowerCase()}_banner.svg`;

      if (student.isPrefect) {
        let badge = document.createElement("img");
        badge.src = "./images/graphics/prefect.svg";
        clone.querySelector(".badges_container").insertAdjacentElement("afterbegin", badge);
      }
      if (student.isSquad) {
        let badge = document.createElement("img");
        badge.src = "./images/graphics/squad.svg";
        clone.querySelector(".badges_container").insertAdjacentElement("afterbegin", badge);
      }
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
    let currentStudent;

    // Makes sure that we have the right student, instead of just getting its array position.
    students.forEach((stud) => {
      if (Number(stud.id) === Number(id)) {
        currentStudent = stud;
      }
    });

    this.HTML.popupParentNode.dataset.studId = id;
    let clone = this.HTML.popupTemplate.cloneNode(true);
    clone.querySelector("h3[data-name-order = first]").textContent = currentStudent.firstName;
    clone.querySelector("p[data-name-order = middle]").textContent = currentStudent.middleName;
    clone.querySelector("p[data-name-order = last]").textContent = currentStudent.lastName;
    clone.querySelector("p[data-name-order = nick_name]").textContent = currentStudent.nickName;
    clone.querySelector("p[data-house = house]").textContent = currentStudent.house;
    clone.querySelector("p[data-blood = blood]").textContent = currentStudent.bloodStatus;
    clone.querySelector(".banner").src = `./images/graphics/${currentStudent.house.toLowerCase()}_banner.svg`;
    clone.querySelector(".btn").dataset.studId = currentStudent.id;

    // Populate image only if student has an image src, otherwise use default.
    if (currentStudent.imageSrc) {
      clone.querySelector("img").src = currentStudent.imageSrc;
    }

    // Change prefect button text
    if (currentStudent.isPrefect && !currentStudent.isExpelled) {
      clone.querySelector("a[data-action='prefect']").textContent = "Revoke prefect status";
    }

    // Change squad button text
    if (currentStudent.isSquad && !currentStudent.isExpelled) {
      clone.querySelector("a[data-action='squad']").textContent = "Kick out from Squad";
    }

    // If student doesn't have a middle name, hide the label and span
    if (!currentStudent.middleName) {
      clone.querySelector("span[data-label = middle_name]").style.display = "none";
      clone.querySelector("p[data-name-order = middle]").style.display = "none";
    }

    // If student doesn't have a last name, hide the label and span
    if (!currentStudent.lastName) {
      clone.querySelector("span[data-label = last_name]").style.display = "none";
      clone.querySelector("p[data-name-order = last]").style.display = "none";
    }

    // If student doesn't have a nickname, hide the label and span
    if (!currentStudent.nickName) {
      clone.querySelector("span[data-label = nick_name]").style.display = "none";
      clone.querySelector("p[data-name-order = nick_name]").style.display = "none";
    }

    // If student is expelled, hide the expell, squad and prefect buttons
    if (currentStudent.isExpelled) {
      clone.querySelector("a[data-action='expell']").remove();
      clone.querySelector("a[data-action='squad']").remove();
      clone.querySelector("a[data-action='prefect']").remove();
    }

    if (currentStudent.isPrefect) {
      let badge = document.createElement("img");
      badge.src = "./images/graphics/prefect.svg";
      clone.querySelector(".badges_container").insertAdjacentElement("afterbegin", badge);
    }
    if (currentStudent.isSquad) {
      let badge = document.createElement("img");
      badge.src = "./images/graphics/squad.svg";
      clone.querySelector(".badges_container").insertAdjacentElement("afterbegin", badge);
    }
    // Set background to House's background image
    clone.querySelector("article").style.backgroundImage = `url(images/graphics/${currentStudent.house.toLowerCase()}_bg.webp)`;

    //Clone's Event Listeners
    clone.querySelector(".overlay").addEventListener("click", (e) => {
      if (e.target.classList.contains("overlay")) {
        this.HTML.popupParentNode.firstElementChild.remove();
      }
    });

    // Cancel's event listener
    clone.querySelector("a[data-action='cancel']").addEventListener("click", (e) => {
      this.HTML.popupParentNode.firstElementChild.remove();
    });

    // Append information to popup parent as a child
    this.HTML.popupParentNode.append(clone);
  }

  // Handle sort and filter popup
  _HandleOptionsPopup() {
    // console.log(this);
    // changes dataset according to current state
    if (this.parentNode.dataset.popup === "closed") {
      this.parentNode.dataset.popup = "open";
      let otherElements = document.querySelector("#options").children;
      for (let i = 0; i < otherElements.length; i++) {
        if (otherElements[i] !== this.parentNode) {
          otherElements[i].dataset.popup = "closed";
        }
      }
    } else {
      this.parentNode.dataset.popup = "closed";
    }
  }

  // Close sort and filter options popup
  _CloseOptions() {
    this.HTML.filterTrigger.parentElement.dataset.popup = "closed";
    this.HTML.sortTrigger.parentElement.dataset.popup = "closed";
    this.HTML.infoTrigger.parentElement.dataset.popup = "closed";
  }

  _ShowInfo() {
    document.querySelectorAll("p[data-info=slytherin] span").forEach((el) => {
      el.textContent = this.info.houseInfo.slytherin;
    });
    document.querySelectorAll("p[data-info=gryffindor] span").forEach((el) => {
      el.textContent = this.info.houseInfo.gryffindor;
    });
    document.querySelectorAll("p[data-info=hufflepuff] span").forEach((el) => {
      el.textContent = this.info.houseInfo.hufflepuff;
    });
    document.querySelectorAll("p[data-info=ravenclaw] span").forEach((el) => {
      el.textContent = this.info.houseInfo.ravenclaw;
    });
    document.querySelectorAll("p[data-info=total_students] span").forEach((el) => {
      el.textContent = this.info.generalInfo.totalStuds;
    });
    document.querySelectorAll("p[data-info=displayed_students] span").forEach((el) => {
      el.textContent = this.info.generalInfo.displayedStuds;
    });
    document.querySelectorAll("p[data-info=expelled_students] span").forEach((el) => {
      el.textContent = this.info.generalInfo.expelledStuds;
    });
  }

  _Notify(notificationText) {
    let notification = document.createElement("div");
    let text = document.createElement("span");
    let bell = document.createElement("img");
    bell.classList.add("notification_bell");
    bell.src = "./images/graphics/notification.svg";
    notification.classList.add("single_notification");
    text.textContent = notificationText;
    notification.insertAdjacentElement("afterbegin", bell);
    notification.insertAdjacentElement("beforeend", text);
    notification.addEventListener("animationend", () => {
      notification.remove();
    });
    this.HTML.notificationsParent.insertAdjacentElement("afterbegin", notification);
  }
}
