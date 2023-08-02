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
const getTransfer = (req, res) => {
  const q =
    "SELECT t.idtransfer,t.idstock, t.status,puc.idproductUnitConversion, puc.idproduct, p.name as product, p.code, u.iduom, u.name as uom, t.qty, t.warehouseFrom, t.warehouseTo, t.created_at, w.warehouse_name as warehouseFromName, w2.warehouse_name as warehouseToName FROM test.transfer as t JOIN test.stock as s ON t.idstock = s.idstock JOIN test.productUnitConversion as puc ON puc.idproductUnitConversion = s.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom JOIN test.warehouse as w ON w.idwarehouse = t.warehouseFrom JOIN test.warehouse as w2 ON w2.idwarehouse = t.warehouseTo;";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const formattedData = data.map((item) => ({
      ...item,
      created_at: formatDatetime(item.created_at),
    }));

    return res.json(formattedData);
  });
};
const getTransferWIP = (req, res) => {
  const q =
    "SELECT t.idtransfer,t.idstock, t.status,puc.idproductUnitConversion, puc.idproduct, p.name as product, p.code, u.iduom, u.name as uom, t.qty, t.warehouseFrom, t.warehouseTo, t.created_at FROM test.transfer as t JOIN test.stock as s ON t.idstock = s.idstock JOIN test.productUnitConversion as puc ON puc.idproductUnitConversion = s.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom WHERE status = 'WIP';";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const formattedData = data.map((item) => ({
      ...item,
      created_at: formatDatetime(item.created_at),
    }));

    return res.json(formattedData);
  });
};
const getTransferReceived = (req, res) => {
  const q =
    "SELECT t.idtransfer,t.idstock, t.status,puc.idproductUnitConversion, puc.idproduct, p.name as product, p.code, u.iduom, u.name as uom, t.qty, t.warehouseFrom, t.warehouseTo, t.created_at FROM test.transfer as t JOIN test.stock as s ON t.idstock = s.idstock JOIN test.productUnitConversion as puc ON puc.idproductUnitConversion = s.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom WHERE status = 'Received';";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const formattedData = data.map((item) => ({
      ...item,
      created_at: formatDatetime(item.created_at),
    }));

    return res.json(formattedData);
  });
};

const getTransferById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT t.idtransfer,t.idstock, t.status,puc.idproductUnitConversion, puc.idproduct, p.name as product, p.code, u.iduom, u.name as uom, t.qty, t.warehouseFrom, t.warehouseTo, t.created_at FROM test.transfer as t JOIN test.stock as s ON t.idstock = s.idstock JOIN test.productUnitConversion as puc ON puc.idproductUnitConversion = s.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom WHERE idtransfer = ?";
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const formattedData = data.map((item) => ({
      ...item,
      created_at: formatDatetime(item.created_at),
    }));

    return res.json(formattedData);
  });
};

const createTransfer = (req, res) => {
  const { idstock, warehouseFrom, warehouseTo, qty } = req.body;
  const values = [idstock, warehouseFrom, warehouseTo, qty];
  const q =
    "INSERT INTO transfer (idstock, warehouseFrom, warehouseTo, qty)  VALUES (?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateTransfer = (req, res) => {
  const { qty } = req.body;
  const id = req.params.id;
  const values = [qty, id];

  const q = "UPDATE transfer SET qty = ? WHERE idtransfer = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const updateTransferStatus = (req, res) => {
  const id = req.params.id;
  const values = [id];

  const q = "UPDATE transfer SET status = 'Received' WHERE idtransfer = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteTransfer = (req, res) => {
  const id = req.params.id;
  const deleteTransfer = `DELETE FROM transfer WHERE idtransfer = ?`;
  db.query(deleteTransfer, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

export {
  getTransfer,
  getTransferById,
  updateTransferStatus,
  createTransfer,
  deleteTransfer,
  updateTransfer,
};
