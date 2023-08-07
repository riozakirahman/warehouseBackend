import db from "../db/db.js";

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

const getProvince = (req, res) => {
  const q = "SELECT * FROM province";
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
const getProvinceById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM province WHERE idprovince = ?";
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
const createProvince = (req, res) => {
  const { provinceName, created_by } = req.body;
  const values = [provinceName, created_by];
  const q = "INSERT INTO province (provinceName, created_by) VALUES (?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const updateProvince = (req, res) => {
  const { provinceName, modified_by } = req.body;

  const id = req.params.id;
  const values = [provinceName, modified_by, id];

  const q =
    "UPDATE province SET provinceName = ?, modified_by = ? WHERE idprovince = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteProvince = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM province WHERE idprovince = ?`;
  db.query(deleteQuery, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getProvince,
  createProvince,
  getProvinceById,
  updateProvince,
  deleteProvince,
};
