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

const getCountry = (req, res) => {
  const q = "SELECT * FROM country";
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
const createCountry = (req, res) => {
  const { countryName, created_by } = req.body;
  const values = [countryName, created_by];
  const q = "INSERT INTO country (countryName,created_by) VALUES (?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getCountryById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM country WHERE idcountry = ?";
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
const updateCountry = (req, res) => {
  const { countryName, modified_by } = req.body;

  const id = req.params.id;
  const values = [countryName, modified_by, id];

  const q =
    "UPDATE country SET countryName = ?, modified_by = ? WHERE idcountry = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteCountry = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM country WHERE idcountry = ?`;
  db.query(deleteQuery, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

export {
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry,
  getCountryById,
};
