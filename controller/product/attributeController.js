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
const getAttribute = (req, res) => {
  const q = "SELECT * FROM attribute";
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
const getAttributeById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM attribute WHERE idattribute =?";
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

const createAttribute = (req, res) => {
  const { attrName, created_by } = req.body;
  const values = [attrName, created_by];
  const q = "INSERT INTO attribute (name, created_by) VALUES (?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateAttribute = (req, res) => {
  const { attrName, modified_by } = req.body;
  const id = req.params.id;
  const values = [attrName, modified_by, id];
  const q = `UPDATE attribute SET name = ?, modified_by = ? WHERE idattribute = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteAttribute = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM attribute WHERE idattribute = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  getAttributeById,
};
