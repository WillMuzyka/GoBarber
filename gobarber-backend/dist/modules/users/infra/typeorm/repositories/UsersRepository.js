"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _User = _interopRequireDefault(require("../entities/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_User.default);
  }

  async save(user) {
    return this.ormRepository.save(user);
  }

  async create(userData) {
    const user = this.ormRepository.create(userData);
    await this.ormRepository.save(user);
    return user;
  }

  async findById(id) {
    const user = this.ormRepository.findOne(id);
    return user;
  }

  async findByEmail(email) {
    const user = this.ormRepository.findOne({
      where: {
        email
      }
    });
    return user;
  }

  async findAllProviders({
    except_user_id
  }) {
    let filter = {};

    if (except_user_id) {
      filter = {
        where: {
          id: (0, _typeorm.Not)(except_user_id)
        }
      };
    }

    const providers = await this.ormRepository.find(filter);
    return providers;
  }

}

exports.default = UsersRepository;