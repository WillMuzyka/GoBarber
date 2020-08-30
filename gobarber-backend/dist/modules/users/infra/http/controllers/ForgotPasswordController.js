"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SendForgotPasswordEmailService = _interopRequireDefault(require("../../../services/SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ResetPasswordController {
  async create(req, res) {
    const {
      email
    } = req.body;

    const resetPassword = _tsyringe.container.resolve(_SendForgotPasswordEmailService.default);

    await resetPassword.execute({
      email
    });
    return res.status(204).json();
  }

}

exports.default = ResetPasswordController;