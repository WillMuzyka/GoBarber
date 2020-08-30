"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuidv = require("uuidv4");

var _User = _interopRequireDefault(require("../../infra/typeorm/entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.users = [];
  }

  async save(user) {
    const userIndex = this.users.findIndex(findUser => user.id === findUser.id);
    this.users[userIndex] = user;
    return this.users[userIndex];
  }

  async create(userData) {
    const user = new _User.default();
    Object.assign(user, {
      id: (0, _uuidv.uuid)(),
      created_at: new Date(),
      updated_at: new Date()
    }, userData);
    this.users.push(user);
    return user;
  }

  async findById(id) {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }

  async findByEmail(email) {
    const findUser = this.users.find(user => user.email === email);
    return findUser;
  }

  async findAllProviders({
    except_user_id
  }) {
    const providers = [...this.users];
    const providersFiltered = providers.filter(provider => provider.id !== except_user_id);
    return providersFiltered;
  }

}

var _default = UsersRepository;
exports.default = _default;