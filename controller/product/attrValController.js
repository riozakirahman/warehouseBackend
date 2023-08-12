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
const getAttributeValue = (req, res) => {
  const q =
    "SELECT idattributeValue, attr.idattribute,attrvalue.name as name,attr.name as attribute, value ,attrvalue.created_at, attrvalue.created_by,attrvalue.modified_at,attrvalue.modified_by, attrvalue.document_number FROM test.attributeValue as attrvalue JOIN test.attribute as attr ON attr.idattribute = attrvalue.idattribute";
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
const getAttributeValueById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT idattributeValue, attr.idattribute,attrvalue.name as name,attr.name as attribute, value, attrvalue.created_at, attrvalue.created_by,attrvalue.modified_at,attrvalue.modified_by, attrvalue.document_number FROM test.attributeValue as attrvalue JOIN test.attribute as attr ON attr.idattribute = attrvalue.idattribute WHERE attrvalue.idattributeValue = ?";
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

const createAttributeValue = (req, res) => {
  const { idattribute, name, value, created_by } = req.body;
  const values = [idattribute, name, value, created_by];
  const q =
    "INSERT INTO attributeValue (idattribute, name,value, created_by) VALUES (?,?,?, ?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateAttributeValue = (req, res) => {
  const { name, idattr, value, modified_by } = req.body;
  const id = req.params.id;
  const values = [idattr, value, name, modified_by, id];
  const q = `UPDATE attributeValue SET idattribute = ?, value = ?, name = ?, modified_by = ? WHERE idattributeValue = ?`;
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
