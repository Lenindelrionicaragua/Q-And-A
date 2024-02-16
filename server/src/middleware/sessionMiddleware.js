import cookieSession from "cookie-session";
//import jwt from "jsonwebtoken";

const secretKey = "class45-group-c";

const sessionMiddleware = cookieSession({
  name: "session",
  keys: [secretKey],
  maxAge: 24 * 60 * 60 * 1000,
});

// const requireAuth = (req, res, next) => {
//   const session = req.cookies.session;

//   // Verify token which is in cookie value
//   jwt.verify(session, "class45-group-c", (err, data) => {
//     if (err) {
//       return res.sendStatus(403);
//     }

//     if (data.userId) {
//       req.userId = data.userId;
//       next();
//     }
//   });
// };

export { sessionMiddleware };
