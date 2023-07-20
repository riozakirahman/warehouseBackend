import db from "../../db/db.js";

const getVendor = (req, res) => {
  const q = "SELECT * FROM test.vendor";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const getVendorById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM test.vendor WHERE idvendor = ?";

  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createVendor = (req, res) => {
  const { vendor_name, address, contact_person, contact_number, email } =
    req.body;
  const values = [vendor_name, address, contact_person, contact_number, email];
  const q =
    "INSERT INTO vendor (vendor_name, address, contact_person, contact_number, email)  VALUES (?,?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateVendor = (req, res) => {
  const { vendor_name, address, contact_person, contact_number, email } =
    req.body;

  const id = req.params.id;
  const values = [
    vendor_name,
    address,
    contact_person,
    contact_number,
    email,
    id,
  ];

  const q =
    "UPDATE vendor SET vendor_name = ?, address = ?, contact_person = ? , contact_number = ?, email = ? WHERE idvendor = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteVendor = (req, res) => {
  const id = req.params.id;
  const deleteVendor = `DELETE FROM vendor WHERE idvendor = ?`;
  db.query(deleteVendor, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export { getVendor, getVendorById, createVendor, deleteVendor, updateVendor };
