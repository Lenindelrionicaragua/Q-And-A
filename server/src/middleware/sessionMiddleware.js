import cookieSession from "cookie-session";

const secretKey = "class45-group-c";

const sessionMiddleware = cookieSession({
  name: "session",
  keys: [secretKey],
  maxAge: 24 * 60 * 60 * 1000,
});

export { sessionMiddleware };
