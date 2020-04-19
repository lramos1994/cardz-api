const request = require('supertest');
const User = require('../model/user');

// export const chai = require('chai');
// export const should = chai.should();

const app = require('../app');

const defaultUser = {
  email: 'test@test.com',
  password: 'test123',
};

const createUser = async () => {
  const UserModel = new User(defaultUser);
  await UserModel.save();
};

const getDefaultUser = async () => {
  const user = await User.findOne({ email: defaultUser.email });
  if (!user) {
    await createUser();
    return getDefaultUser();
  }

  return user;
};

const loginWithDefaultUser = async () => {
  await getDefaultUser();

  return request(app)
    .post('/login')
    .send(defaultUser)
    .expect(200);
};

const cleanExceptDefaultUser = async () => {
  const user = await getDefaultUser();
  await User.deleteMany({ email: { $ne: user.email } });
};

module.exports = {
  loginWithDefaultUser,
  cleanExceptDefaultUser,
}
