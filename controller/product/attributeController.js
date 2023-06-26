import db from "../../db/db.js";

const getAttribute = (req, res) => {
  const q = "SELECT * FROM attribute";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getAttributeById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM attribute WHERE idattribute =?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createAttribute = (req, res) => {
  const { attrName } = req.body;
  const values = attrName;
  const q = "INSERT INTO attribute (name) VALUES (?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateAttribute = (req, res) => {
  const { attrName } = req.body;
  const id = req.params.id;
  const values = [attrName, id];
  const q = `UPDATE attribute SET name = ? WHERE idattribute = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteAttribute = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM attribute WHERE idattribute = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  getAttributeById,
};
