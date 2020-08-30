"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _UserToken = _interopRequireDefault(require("../../infra/typeorm/entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersTokenRepository {
  constructor() {
    this.usersToken = [];
  }

  async generate(user_id) {
    const userToken = new _UserToken.default();
    Object.assign(userToken, {
      id: (0, _uuidv.uuid)(),
      token: (0, _uuidv.uuid)(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.usersToken.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    const userToken = this.usersToken.find(findUserToken => findUserToken.token === token);
    return userToken;
  }

}

exports.default = UsersTokenRepository;