import db from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const secretKey = "Riohanif1";
const salt = bcrypt.genSaltSync(10);

const getUser = (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};
const signIn = (req, res) => {
  const { username, password } = req.body;
  const q = `SELECT * FROM users WHERE username = ?`;
  const values = [username];
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);

    if (data.length === 0) {
      return res.json({ message: "Invalid username or password" });
    }

    const user = data[0];
    const hashedPassword = user.password;
    // Compare the provided password with the hashed password
    if (bcrypt.compareSync(password, hashedPassword)) {
      const token = jwt.sign({ id: user.idusers, username }, secretKey);
      res.cookie("token", token).json({
        id: user.idusers,
        username,
      });
    } else {
      return res.json({ message: "Invalid username or password" });
    }
  });
};
const register = (req, res) => {
  const { username, password } = req.body;
  const encrypt = bcrypt.hashSync(password, salt);
  const q = "INSERT INTO users (username, password) VALUES (?, ?)";
  const values = [username, encrypt];
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
};

const profile = (req, res) => {
  try {
    const { token } = req.cookies;
    const isVerified = jwt.verify(token, secretKey);
    if (isVerified) {
      res.json(isVerified);
    }
  } catch (error) {
    res.json(null);
  }
};
const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};

export { getUser, signIn, register, profile, logout };
