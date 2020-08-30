"use strict";

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUsersTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersTokenRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUsersTokenRepository;
let fakeMailProvider;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUsersTokenRepository = new _FakeUsersTokenRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeUsersTokenRepository, fakeMailProvider);
  });
  it('should be able to recover the password sending the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    });
    await sendForgotPasswordEmail.execute({
      email: 'jhon@doe.com'
    });
    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able send email to non-existing user', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'jhon@doe.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should be able to generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUsersTokenRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'jhon@doe.com',
      password: '123123'
    });
    await sendForgotPasswordEmail.execute({
      email: 'jhon@doe.com'
    });
    expect(generate).toHaveBeenCalledWith(user.id);
  });
});