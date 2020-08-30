"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class FakeMailProvider {
  constructor() {
    this.emails = [];
  }

  async sendMail(message) {
    this.emails.push(message);
  }

}

exports.default = FakeMailProvider;