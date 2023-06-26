import db from "../../db/db.js";

const getProductUnit = (req, res) => {
  const q = "SELECT * FROM productUnitConversion";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const createProductUnit = (req, res) => {
  const { idproduct, iduom, unitQty } = req.body;
  const values = [idproduct, iduom, unitQty];
  const q =
    "INSERT INTO productUnitConversion (idproduct, iduom, unitQty) VALUES (?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateProductUnit = (req, res) => {
  const { idproduct, iduom, unitQty } = req.body;
  const id = req.params.id;
  const values = [idproduct, iduom, unitQty, id];
  const q = `UPDATE productUnitConversion SET idproduct = ?, iduom = ?, unitQty = ? WHERE idproductUnitConversion = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteProductUnit = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM productUnitConversion WHERE idproductUnitConversion = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getProductUnit,
  createProductUnit,
  updateProductUnit,
  deleteProductUnit,
};
