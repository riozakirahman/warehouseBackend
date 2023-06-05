import db from "../db/db.js";

const getCountry = (req, res) => {
  const q = "SELECT * FROM country";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const createCountry = (req, res) => {
  const { countryName } = req.body;
  const values = countryName;
  const q = "INSERT INTO country (countryName) VALUES (?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

export { getCountry, createCountry };
