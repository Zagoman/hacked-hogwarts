"use strict";
import Controller from "./modules/Controller.js";
import Model from "./modules/Model.js";
import View from "./modules/View.js";

let _APP = null;

class Hogwarts {
  constructor() {
    this.model;
    this.controller;
    this.view;
    this._Init();
  }

  async _Init() {
    //Initiate MVC pattern
    this.model = new Model();
    // Use async so nothing forward is executed before promise is fullfiled
    await this.model._loadJSON("https://petlatkea.dk/2021/hogwarts/students.json");
    this.view = new View();
    // send view and model to controller so it has direct access
    this.controller = new Controller(this.model, this.view);
    console.log(this.model.students);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  _APP = new Hogwarts();
});
