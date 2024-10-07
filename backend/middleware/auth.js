import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");  //The middleware looks for the token in the Authorization header of the request. 

    if (!token) {
      return res.status(403).send("Access Denied");   // If no token is present, it returns a 403 Access Denied response.
    }

    if (token.startsWith("Bearer ")) {    // If the token starts with "Bearer ", it removes that part, leaving just the token itself.
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);     //It then verifies the token using the jwt.verify() method with the secret (process.env.JWT_SECRET). If the token is valid, the decoded user information is attached to req.user
    req.user = verified;
    next();       //If the token is valid, the next() function is called to proceed to the next middleware or route handler.
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
