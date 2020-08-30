"use strict";

var _tsyringe = require("tsyringe");

var _HandlebarsMailProvider = _interopRequireDefault(require("./implementations/HandlebarsMailProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const providers = {
  handlebars: _HandlebarsMailProvider.default
};

_tsyringe.container.registerSingleton('MailTemplateProvider', providers.handlebars);