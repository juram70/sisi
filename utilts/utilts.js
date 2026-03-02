const jwt = require('jsonwebtoken');

// creating user object
const createJwtUser = (user) => {
  return { _id: user._id.toString(), phonenumber: user.phonenumber,whatsappnumber: user.whatsappnumber };
};

const createToken = ({ payload }) => {
  const token = jwt.sign(payload, process.env.jwt_secret, {
    expiresIn: process.env.lifetime,
  });
  return token;
};

const isTokenValid = (token) => jwt.verify(token, process.env.jwt_secret);

const attachCookieToResponse = (res, user) => {
  const token = createToken({ payload: user });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
    signed: true,
    sameSite:"None",
  });
};

module.exports = {
  createJwtUser,
  createToken,
  isTokenValid,
  attachCookieToResponse,
};
