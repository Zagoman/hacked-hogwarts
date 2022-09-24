"use strict";

export default class Hacker {
  constructor(controller) {
    this.controller = controller;
    this._Init();
  }

  _Init() {
    console.log("YOUR SYSTEM HAS BEEN HACKED");
  }
}
