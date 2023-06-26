import db from "../../db/db.js";

const getProduct = (req, res) => {
  const q =
    "SELECT p.idproduct, p.code, p.name, p.quantity, u.name AS uom FROM test.product as p JOIN test.uom as u ON p.baseUOM = u.iduom";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getProductById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT p.idproduct, p.code, p.name, p.quantity, u.name AS uom FROM test.product as p JOIN test.uom as u ON p.baseUOM = u.iduom WHERE p.idproduct = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const createProduct = (req, res) => {
  const { code, name, quantity, baseUOM } = req.body;
  const values = [code, name, quantity, baseUOM];
  const q =
    "INSERT INTO product (code, name, quantity, baseUOM) VALUES (?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateProduct = (req, res) => {
  const { code, name, quantity, baseUOM } = req.body;
  const id = req.params.id;
  const values = [code, name, quantity, baseUOM, id];
  const q = `UPDATE product SET code = ?, name = ?, quantity = ?, baseUOM = ? WHERE idproduct = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteProduct = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM product WHERE idproduct = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
};
