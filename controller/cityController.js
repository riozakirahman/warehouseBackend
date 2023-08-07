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

const getCity = (req, res) => {
  const q = "SELECT * FROM city";
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
const getCityById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM city WHERE idcity = ?";
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
const createCity = (req, res) => {
  const { cityName, created_by } = req.body;
  const values = [cityName, created_by];
  const q = "INSERT INTO city (cityName, created_by) VALUES (?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const updateCity = (req, res) => {
  const { cityName, modified_by } = req.body;

  const id = req.params.id;
  const values = [cityName, modified_by, id];

  const q = "UPDATE city SET cityName = ?, modified_by = ? WHERE idcity = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteCity = (req, res) => {
  const id = req.params.id;
  const deleteCity = `DELETE FROM city WHERE idcity = ?`;
  db.query(deleteCity, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export { getCity, createCity, getCityById, updateCity, deleteCity };
