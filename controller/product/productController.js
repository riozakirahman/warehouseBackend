import db from "../../db/db.js";

function formatDatetime(isoDatetimeString) {
  const jsDate = new Date(isoDatetimeString);
  const year = jsDate.getFullYear();
  const month = String(jsDate.getMonth() + 1).padStart(2, "0");
  const day = String(jsDate.getDate()).padStart(2, "0");
  const hours = String(jsDate.getHours()).padStart(2, "0");
  const minutes = String(jsDate.getMinutes()).padStart(2, "0");
  const seconds = String(jsDate.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const getProduct = (req, res) => {
  const q = "SELECT * from test.product";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const formattedData = data.map((item) => ({
      ...item,
      created_at: formatDatetime(item.created_at),
      modified_at: formatDatetime(item.modified_at),
    }));

    return res.json(formattedData);
  });
};
const getProductById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * from test.product WHERE idproduct = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const formattedData = data.map((item) => ({
      ...item,
      created_at: formatDatetime(item.created_at),
      modified_at: formatDatetime(item.modified_at),
    }));

    return res.json(formattedData);
  });
};
const createProduct = (req, res) => {
  const { code, name, created_by } = req.body;
  const values = [code, name, created_by];
  const q = "INSERT INTO product (code, name, created_by) VALUES (?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateProduct = (req, res) => {
  const { code, name, modified_by } = req.body;
  const id = req.params.id;
  const values = [code, name, modified_by, id];
  const q = `UPDATE product SET code = ?, name = ?, modified_by = ? WHERE idproduct = ?`;
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
