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

const getWarehouse = (req, res) => {
  const q = "SELECT * FROM test.warehouse";
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
const getWarehouseById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM test.warehouse WHERE idwarehouse = ?";
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

const createWarehouse = (req, res) => {
  const {
    warehouse_name,
    address,
    contact_person,
    contact_number,
    status,
    created_by,
  } = req.body;
  const values = [
    warehouse_name,
    address,
    contact_person,
    contact_number,
    status,
    created_by,
  ];
  const q =
    "INSERT INTO `test`.`warehouse` (`warehouse_name`, `address`, `contact_person`, `contact_number`, `status`, `created_by`)  VALUES (?,?,?,?,?, ?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateWarehouse = (req, res) => {
  const {
    warehouse_name,
    address,
    contact_person,
    contact_number,
    status,
    modified_by,
  } = req.body;
  const id = req.params.id;
  const values = [
    warehouse_name,
    address,
    contact_person,
    contact_number,
    status,
    modified_by,
    id,
  ];
  const q =
    "UPDATE `test`.`warehouse` SET warehouse_name = ? ,address = ?, contact_person = ?,contact_number = ? , status = ?, modified_by = ? WHERE idwarehouse = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteWarehouse = (req, res) => {
  const id = req.params.id;
  const values = id;
  const q = `DELETE FROM warehouse WHERE idwarehouse = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getWarehouse,
  getWarehouseById,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
