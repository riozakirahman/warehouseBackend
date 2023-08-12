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

const getVendor = (req, res) => {
  const q = "SELECT * FROM test.vendor";
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

const getVendorById = (req, res) => {
  const id = req.params.id;
  const q = "SELECT * FROM test.vendor WHERE idvendor = ?";

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

const createVendor = (req, res) => {
  const {
    vendor_name,
    address,
    contact_person,
    contact_number,
    email,
    created_by,
  } = req.body;
  const values = [
    vendor_name,
    address,
    contact_person,
    contact_number,
    email,
    created_by,
  ];
  const q =
    "INSERT INTO vendor (vendor_name, address, contact_person, contact_number, email, created_by)  VALUES (?,?,?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateVendor = (req, res) => {
  const {
    vendor_name,
    address,
    contact_person,
    contact_number,
    email,
    modified_by,
  } = req.body;

  const id = req.params.id;
  const values = [
    vendor_name,
    address,
    contact_person,
    contact_number,
    email,
    modified_by,
    id,
  ];

  const q =
    "UPDATE vendor SET vendor_name = ?, address = ?, contact_person = ? , contact_number = ?, email = ?, modified_by = ? WHERE idvendor = ? ";
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
