import db from "../db/db.js";

const createCurrency = (req, res) => {
  const { currency_code, currency_name } = req.body;
  const values = [currency_code, currency_name];
  const q = "INSERT INTO currency (currency_code, currency_name) VALUES (?, ?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const getCurrency = (req, res) => {
  const q = "SELECT * FROM currency";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

export { createCurrency, getCurrency };
