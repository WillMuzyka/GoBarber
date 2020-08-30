"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      name: process.env.MAIL_DEFAULT_NAME,
      email: process.env.MAIL_DEFAULT_EMAIL
    }
  }
};
exports.default = _default;