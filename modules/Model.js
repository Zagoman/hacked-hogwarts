"use strict";

export default class Model {
  constructor() {
    this.students;
    this._Init();
  }

  _Init() {
    console.log("model instanciated");
  }

  async _loadJSON(url) {
    const res = await fetch(url);
    const jsonData = await res.json();

    this.students = jsonData;
  }
}
