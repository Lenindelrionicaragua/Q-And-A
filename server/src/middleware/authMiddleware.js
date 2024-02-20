import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const session = req.cookies.session;

  // Verify token which is in cookie value
  jwt.verify(session, "class45-group-c", (err, data) => {
    if (err) {
      return res.sendStatus(403);
    }

    if (data.userId) {
      req.userId = data.userId;
      next();
    }
  });
};
