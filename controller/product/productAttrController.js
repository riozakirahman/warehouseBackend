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

const getProductAttr = (req, res) => {
  const q =
    "SELECT P.idproductAttribute, P.document_number,e.idproduct,e.code, e.name as product, a.name as attributeValue,P.idattrvalue,P.idattrvalue, P.created_at,P.created_by,P.modified_at, P.modified_by FROM test.productAttribute AS P JOIN test.product AS e ON P.idproduct = e.idproduct JOIN test.attributeValue AS a ON P.idattrvalue = a.idattributevalue;";
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
const getProductAttrById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT P.idproductAttribute,P.document_number, e.idproduct,e.code, e.name as product, a.name as attributeValue,P.idattrvalue,P.idattrvalue, P.created_at,P.created_by,P.modified_at, P.modified_by FROM test.productAttribute AS P JOIN test.product AS e ON P.idproduct = e.idproduct JOIN test.attributeValue AS a ON P.idattrvalue = a.idattributevalue WHERE p.idproductAttribute = ?";
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
const createProductAttr = (req, res) => {
  const { idproduct, idattrvalue, created_by } = req.body;
  const values = [idproduct, idattrvalue, created_by];
  const q =
    "INSERT INTO productAttribute (idproduct, idattrvalue, created_by) VALUES (?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateProductAttr = (req, res) => {
  const { idattrvalue, idproduct, modified_by } = req.body;
  const id = req.params.id;
  const values = [idproduct, idattrvalue, modified_by, id];
  const q = `UPDATE productAttribute SET idproduct = ?,idattrvalue = ?, modified_by = ? WHERE idproductAttribute = ?`;
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
