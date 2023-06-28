import db from "../db/db.js";

const getWarehouse = (req, res) => {
  const q = "SELECT * FROM test.warehouse";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getWarehouseById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM test.warehouse WHERE idwarehouse = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createWarehouse = (req, res) => {
  const { warehouse_name, address, contact_person, contact_number, status } =
    req.body;
  const values = [
    warehouse_name,
    address,
    contact_person,
    contact_number,
    status,
  ];
  const q =
    "INSERT INTO `test`.`warehouse` (`warehouse_name`, `address`, `contact_person`, `contact_number`, `status`)  VALUES (?,?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateWarehouse = (req, res) => {
  const { warehouse_name, address, contact_person, contact_number, status } =
    req.body;
  const id = req.params.id;
  const values = [
    warehouse_name,
    address,
    contact_person,
    contact_number,
    status,
    id,
  ];
  const q =
    "UPDATE `test`.`warehouse` SET warehouse_name = ? ,address = ?, contact_person = ?,contact_number = ? , status = ? WHERE idwarehouse = ? ";
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
