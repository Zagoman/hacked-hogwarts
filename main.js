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
    // Whenever Hogwarts class is instanciated, it calls _Init, initiating the program.
    this._Init();
  }

  async _Init() {
    //Initiate MVC pattern
    this.model = new Model();

    // Use async so nothing forward is executed before promise is fullfiled
    await this.model._LoadBloodData("https://petlatkea.dk/2021/hogwarts/families.json");
    await this.model._loadJSON("https://petlatkea.dk/2021/hogwarts/students.json");

    // Initiate View
    this.view = new View();

    // send view and model to controller so it has direct access
    this.controller = new Controller(this.model, this.view);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // Initiate program by instanciating the Hogwarts class
  _APP = new Hogwarts();
});
