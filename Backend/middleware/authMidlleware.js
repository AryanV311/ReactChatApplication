import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) return res.status(401).send("you are not authencticated");
//   jwt.verify(token, process.env.JWT_KEY, async (err, payload) => {
//     if (err) return res.status(402).send("Token in not valid!");
//     req.userId = payload.id;
//     next();
//   });
// };

export const verifyToken = (req, res, next) => {
  console.log("Incoming Cookies:", req.cookies); // Debugging

  const token = req.cookies.jwt;
  if (!token) {
    console.log("No token found in cookies");
    return res.status(401).send("You are not authenticated");
  }

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(402).send("Token is not valid!");
    }

    req.userId = payload.id;
    console.log("Token verified, user ID:", req.userId);
    next();
  });
};
