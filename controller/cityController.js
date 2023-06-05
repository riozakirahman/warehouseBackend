import db from "../db/db.js";

const getCity = (req, res) => {
  const q = "SELECT * FROM city";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const createCity = (req, res) => {
  const { cityName } = req.body;
  const values = cityName;
  const q = "INSERT INTO city (cityName) VALUES (?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export { getCity, createCity };
