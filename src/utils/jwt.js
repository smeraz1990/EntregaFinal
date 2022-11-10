import jwt from "jsonwebtoken";

const privateKey = "saymon";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: true,
      message: "You dont hace permission to visit this page1",
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, privateKey, (err, decodedPayload) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "You dont hace permission to visit this page2",
      });
    }

    req.user = decodedPayload.data;
    req.token = token;

    next();
  });
};

const generateToken = (user) => {
  const payload = {
    data: {
      username: user.username,
    },
  };
  return jwt.sign(payload, privateKey, { expiresIn: "30m" });
};

export default { generateToken, authMiddleware };
