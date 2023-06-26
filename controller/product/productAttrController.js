import db from "../../db/db.js";

const getProductAttr = (req, res) => {
  const q =
    "SELECT P.idproductAttribute, e.code, e.name as product, a.name as attributeValue,P.idattrvalue FROM test.productAttribute AS P JOIN test.product AS e ON P.idproduct = e.idproduct JOIN test.attributeValue AS a ON P.idattrvalue = a.idattributevalue;";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getProductAttrById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT P.idproductAttribute, e.code, e.name as product, a.name as attributeValue, P.idattrvalue FROM test.productAttribute AS P JOIN test.product AS e ON P.idproduct = e.idproduct JOIN test.attributeValue AS a ON P.idattrvalue = a.idattributevalue WHERE p.idproductAttribute = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const createProductAttr = (req, res) => {
  const { idproduct, idattrvalue } = req.body;
  const values = [idproduct, idattrvalue];
  const q =
    "INSERT INTO productAttribute (idproduct, idattrvalue) VALUES (?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateProductAttr = (req, res) => {
  const { idattrvalue, idproduct } = req.body;
  const id = req.params.id;
  const values = [idproduct, idattrvalue, id];
  const q = `UPDATE productAttribute SET idproduct = ?,idattrvalue = ? WHERE idproductAttribute = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteProductAttr = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM productAttribute WHERE idproductAttribute = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getProductAttr,
  getProductAttrById,
  createProductAttr,
  updateProductAttr,
  deleteProductAttr,
};
