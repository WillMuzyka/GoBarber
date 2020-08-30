"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

var _ListProvidersService = _interopRequireDefault(require("../../../services/ListProvidersService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProvidersController {
  async index(req, res) {
    const user_id = req.user.id;

    const listProviders = _tsyringe.container.resolve(_ListProvidersService.default);

    const providers = await listProviders.execute({
      except_user_id: user_id
    });
    return res.json((0, _classTransformer.classToClass)(providers));
  }

}

exports.default = ProvidersController;