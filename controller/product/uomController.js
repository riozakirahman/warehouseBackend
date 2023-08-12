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

const getUom = (req, res) => {
  const q = "SELECT * FROM uom";
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
const getUomById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM uom WHERE iduom = ?";
  const values = id;
  db.query(q, values, (err, data) => {
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

const createUom = (req, res) => {
  const { uomName, created_by } = req.body;
  const values = [uomName, created_by];
  const q = "INSERT INTO uom (name,created_by) VALUES (?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateUom = (req, res) => {
  const { uomName, modified_by } = req.body;
  const id = req.params.id;
  const values = [uomName, modified_by, id];
  const q = `UPDATE uom SET name = ?, modified_by = ? WHERE iduom = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteUom = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM uom WHERE iduom = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export { getUom, createUom, updateUom, deleteUom, getUomById };
