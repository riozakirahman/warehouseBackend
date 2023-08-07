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

const createCurrency = (req, res) => {
  const { currency_code, currency_name, created_by } = req.body;
  const values = [currency_code, currency_name, created_by];
  const q =
    "INSERT INTO currency (currency_code, currency_name, created_by) VALUES (?, ?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const getCurrency = (req, res) => {
  const q = "SELECT * FROM currency";
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
const getCurrencyById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM currency WHERE idcurrency = ?";
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
const updateCurrency = (req, res) => {
  const { currency_code, currency_name, modified_by } = req.body;
  const id = req.params.id;
  const values = [currency_code, currency_name, modified_by, id];

  const q =
    "UPDATE currency SET currency_code = ?, currency_name = ?, modified_by = ? WHERE idcurrency = ?";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteCurrency = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM currency WHERE idcurrency = ?`;
  db.query(deleteQuery, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

export {
  createCurrency,
  getCurrency,
  deleteCurrency,
  updateCurrency,
  getCurrencyById,
};
