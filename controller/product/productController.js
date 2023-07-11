import db from "../../db/db.js";

const getProduct = (req, res) => {
  const q = "SELECT * from test.product";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getProductById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * from test.product WHERE idproduct = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const createProduct = (req, res) => {
  const { code, name } = req.body;
  const values = [code, name];
  const q = "INSERT INTO product (code, name) VALUES (?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateProduct = (req, res) => {
  const { code, name } = req.body;
  const id = req.params.id;
  const values = [code, name, id];
  const q = `UPDATE product SET code = ?, name = ?  WHERE idproduct = ?`;
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
