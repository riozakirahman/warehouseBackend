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

const getPO = (req, res) => {
  const q =
    "SELECT idpurchase_order, p.idvendor ,p.created_at,p.created_by,p.modified_at,p.modified_by,p.document_number, p.idstock, v.vendor_name, w.warehouse_name,pr.code, pr.name as product, u.name as uom, p.quantity, p.status, p.total, p.price FROM test.purchase_order as p JOIN test.vendor as v ON p.idvendor = v.idvendor JOIN test.stock as s ON s.idstock = p.idstock JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as pr ON pr.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom = puc.iduom JOIN test.warehouse as w ON s.idwarehouse = w.idwarehouse";
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

const getPOWaiting = (req, res) => {
  const status = "Waiting";
  const q =
    "SELECT idpurchase_order, p.idvendor , p.idstock, v.vendor_name, w.warehouse_name,pr.code, pr.name as product, u.name as uom, p.quantity, p.status, p.total, p.price FROM test.purchase_order as p JOIN test.vendor as v ON p.idvendor = v.idvendor JOIN test.stock as s ON s.idstock = p.idstock JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as pr ON pr.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom = puc.iduom JOIN test.warehouse as w ON s.idwarehouse = w.idwarehouse WHERE p.status = ?";
  db.query(q, status, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateStatus = (req, res) => {
  const id = req.params.id;
  const { modified_by } = req.body;
  const status = "Done";
  const values = [status, modified_by, id];
  const q =
    "UPDATE purchase_order SET status = ?, modified_by = ? WHERE idpurchase_order = ?";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    // return res.json(data);
  });
  const getStockId =
    "SELECT idstock FROM purchase_order WHERE idpurchase_order = ?";
  db.query(getStockId, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const idstock = data[0].idstock;
    const getQty = "SELECT qty FROM stock WHERE idstock = ? ";
    db.query(getQty, idstock, (err, data) => {
      if (err) {
        return res.json(err.sqlMessage);
      }
      return res.json(data[0]);
    });
  });
};

const getPOById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT idpurchase_order, p.idvendor,p.created_at,p.created_by,p.modified_at,p.modified_by,p.document_number, p.idstock, v.vendor_name, w.warehouse_name,pr.code, pr.name as product, u.name as uom, p.quantity, p.status, p.total, p.price FROM test.purchase_order as p JOIN test.vendor as v ON p.idvendor = v.idvendor JOIN test.stock as s ON s.idstock = p.idstock JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as pr ON pr.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom = puc.iduom JOIN test.warehouse as w ON s.idwarehouse = w.idwarehouse WHERE idpurchase_order = ?";

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

const createPO = (req, res) => {
  const { idvendor, idstock, status, quantity, price, total, created_by } =
    req.body;
  const values = [
    idvendor,
    idstock,
    status,
    quantity,
    price,
    total,
    created_by,
  ];
  const q =
    "INSERT INTO purchase_order (idvendor, idstock,  status, quantity, price, total,created_by)  VALUES (?,?,?,?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updatePO = (req, res) => {
  const { idvendor, idstock, status, quantity, price, total, modified_by } =
    req.body;

  const id = req.params.id;
  const values = [
    idvendor,
    idstock,
    status,
    quantity,
    price,
    total,
    modified_by,
    id,
  ];

  const q =
    "UPDATE purchase_order SET idvendor = ?,  idstock = ? ,  status = ?, quantity = ?, price = ?, total = ?, modified_by = ? WHERE idpurchase_order = ?";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deletePO = (req, res) => {
  const id = req.params.id;

  const deleteStock = `DELETE FROM purchase_order WHERE idpurchase_order = ?`;
  db.query(deleteStock, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  getPO,
  getPOById,
  getPOWaiting,
  createPO,
  deletePO,
  updatePO,
  updateStatus,
};
