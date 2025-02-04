import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  // console.log("req", req.cookies);
  const token = req.cookies.jwt;
  console.log("token", token);
  if (!token) return res.status(401).send("you are not authencticated");
  jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
    if(err) return res.status(402).send("Token in not valid!");
    req.userId = payload.id
    next();
  });
};
