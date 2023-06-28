import db from "../../db/db.js";

const getProductUnit = (req, res) => {
  const q =
    "SELECT puc.idproductUnitConversion, puc.idproduct, puc.iduom, puc.unitQty,puc.iduom, p.code, p.name as product, u.name as uom  FROM test.productUnitConversion as puc JOIN test.product as p ON puc.idproduct = p.idproduct JOIN test.uom as u ON puc.iduom = u.iduom";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getProductUnitById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT puc.idproductUnitConversion, puc.idproduct, puc.iduom, puc.unitQty,puc.iduom, p.code, p.name as product, u.name as uom  FROM test.productUnitConversion as puc JOIN test.product as p ON puc.idproduct = p.idproduct JOIN test.uom as u ON puc.iduom = u.iduom WHERE puc.idproductUnitConversion = ?";
  db.query(q, id, (err, data) => {
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
  getProductUnitById,
  createProductUnit,
  updateProductUnit,
  deleteProductUnit,
};
