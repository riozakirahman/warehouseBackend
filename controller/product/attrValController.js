import db from "../../db/db.js";

const getAttributeValue = (req, res) => {
  const q =
    "SELECT idattributeValue, attrvalue.name as name,attr.name as attribute, value FROM test.attributeValue as attrvalue JOIN test.attribute as attr ON attr.idattribute = attrvalue.idattribute";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getAttributeValueById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT idattributeValue, attrvalue.name as name,attr.name as attribute, value FROM test.attributeValue as attrvalue JOIN test.attribute as attr ON attr.idattribute = attrvalue.idattribute WHERE attrvalue.idattributeValue = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createAttributeValue = (req, res) => {
  const { idattribute, name, value } = req.body;
  const values = [idattribute, name, value];
  const q =
    "INSERT INTO attributeValue (idattribute, name,value) VALUES (?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateAttributeValue = (req, res) => {
  const { name, idattr, value } = req.body;
  const id = req.params.id;
  const values = [idattr, value, name, id];
  const q = `UPDATE attributeValue SET idattribute = ?, value = ?, name = ? WHERE idattributeValue = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteAttributeValue = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM attributeValue WHERE idattributeValue = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getAttributeValue,
  createAttributeValue,
  updateAttributeValue,
  deleteAttributeValue,
  getAttributeValueById,
};
