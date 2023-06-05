import db from "../db/db.js";

const getProvince = (req, res) => {
  const q = "SELECT * FROM province";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const createProvince = (req, res) => {
  const { provinceName } = req.body;
  const values = provinceName;
  const q = "INSERT INTO province (provinceName) VALUES ( ?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export { getProvince, createProvince };
