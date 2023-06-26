import db from "../../db/db.js";

const getUom = (req, res) => {
  const q = "SELECT * FROM uom";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getUomById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM uom WHERE iduom = ?";
  const values = id;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createUom = (req, res) => {
  const { uomName } = req.body;
  const values = uomName;
  const q = "INSERT INTO uom (name) VALUES (?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateUom = (req, res) => {
  const { uomName } = req.body;
  const id = req.params.id;
  const values = [uomName, id];
  const q = `UPDATE uom SET name = ? WHERE iduom = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteUom = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM uom WHERE iduom = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export { getUom, createUom, updateUom, deleteUom, getUomById };
