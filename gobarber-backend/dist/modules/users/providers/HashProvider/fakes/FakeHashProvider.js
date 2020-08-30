"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class BCryptHashProvider {
  async generateHash(payload) {
    return payload;
  }

  async compareHash(payload, hashed) {
    return payload === hashed;
  }

}

exports.default = BCryptHashProvider;