//This file is used to generate token, & validate token
//In token, username/eiin, usertype, is included in payload



// authenticationService.js

const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey; // secret key for JWT


//this function generated token
function generateToken(payload, type) {
  //Include username & type in the token
  let tokenPayload;
  if (type == 1) {
    tokenPayload = { ...payload, eiin: payload.eiin, type: 1 };
  }
  else {
    tokenPayload = { ...payload, username: payload.username, type: 0 };
  }
  return jwt.sign(tokenPayload, secretKey, { expiresIn: '1h' }); // Set the token expiration time
}


//this function just verify token
function verifyToken(token) {
  try {
    const decodedToken = jwt.verify(token, secretKey);
    return decodedToken;
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
}

//this function verifies token for Admin, 
//it checks the token holder is admin or not & next direct it to actual path if token holder is admin
//retrieve eiin from token & sends it back
function adminAuthenticate(req, res, next) {
  if(!req.headers.authorization){
    return res.status(401).json({ error: 'Token required!' });
  }
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token required!' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    if (decodedToken.type != 1) {
      return res.status(401).json({ error: 'Admin required!' });
    }
    res.locals.eiin = decodedToken.eiin;
    next();
  }
  catch (err) {
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ error: 'Token has expired!' });
    }
    return res.status(401).json({ error: 'Invalid token!' });
  }
}


//same as adminAuthenticate but for all users,
//retrieve & send username from token  
function reqAthenticate(req, res, next) {
  if(!req.headers.authorization){
    return res.status(401).json({ error: 'Token required!' });
  }
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token required!' });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    res.locals.username = decodedToken.username;
    next();
  }
  catch (err) {
    return res.status(401).json({ error: 'Invalid token!' });
  }
}

module.exports = {
  generateToken,
  verifyToken,
  adminAuthenticate,
  reqAthenticate
};
