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

const getProductUnit = (req, res) => {
  const q =
    "SELECT puc.idproductUnitConversion, puc.created_at,puc.created_by,puc.modified_at,puc.modified_by,puc.document_number,puc.idproduct, puc.iduom, puc.iduom, p.code, p.name as product, u.name as uom  FROM test.productUnitConversion as puc JOIN test.product as p ON puc.idproduct = p.idproduct JOIN test.uom as u ON puc.iduom = u.iduom";
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
const getProductUnitById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT puc.idproductUnitConversion, puc.created_at,puc.created_by,puc.modified_at,puc.modified_by,puc.document_number,puc.idproduct, puc.iduom, puc.iduom, p.code, p.name as product, u.name as uom  FROM test.productUnitConversion as puc JOIN test.product as p ON puc.idproduct = p.idproduct JOIN test.uom as u ON puc.iduom = u.iduom WHERE puc.idproductUnitConversion = ?";
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
const createProductUnit = (req, res) => {
  const { idproduct, iduom, created_by } = req.body;
  const values = [idproduct, iduom, created_by];
  const q =
    "INSERT INTO productUnitConversion (idproduct, iduom, created_by) VALUES (?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateProductUnit = (req, res) => {
  const { idproduct, iduom, modified_by } = req.body;
  const id = req.params.id;
  const values = [idproduct, iduom, modified_by, id];
  const q = `UPDATE productUnitConversion SET idproduct = ?, iduom = ?, modified_by = ? WHERE idproductUnitConversion = ?`;
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
