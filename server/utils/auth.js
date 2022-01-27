const jwt = require('jsonwebtoken');
// set token secret and expiration date
const secret = process.env.JWTSECRET || 'mysecretsshhhhh'
const expiration = '8h';

module.exports = {
  // function for our authenticated routes
  authMiddleware: function ({ req }) {
    // allows token to be sent via  req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      // console.log('please provide a valid token');
      return req
    }

    // verify token and get user data out of it
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // THIS IS THE **CONTEXT** THAT IS PASTED INTO THE RESOLVER
      req.user = data;
    } catch {
      console.log('Invalid token');
      return req
    }

    // send to next endpoint
    return req
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };
    console.log("secret output", secret);

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
