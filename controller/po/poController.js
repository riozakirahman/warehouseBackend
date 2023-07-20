import db from "../../db/db.js";

const getPO = (req, res) => {
  const q =
    "SELECT idpurchase_order, p.idvendor , p.idstock, v.vendor_name, w.warehouse_name,pr.code, pr.name as product, u.name as uom, p.quantity, p.status, p.total, p.price FROM test.purchase_order as p JOIN test.vendor as v ON p.idvendor = v.idvendor JOIN test.stock as s ON s.idstock = p.idstock JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as pr ON pr.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom = puc.iduom JOIN test.warehouse as w ON s.idwarehouse = w.idwarehouse";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
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
  const status = "Done";
  const values = [status, id];
  const q = "UPDATE purchase_order SET status = ? WHERE idpurchase_order = ?";
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
    "SELECT idpurchase_order, p.idvendor , p.idstock, v.vendor_name, w.warehouse_name,pr.code, pr.name as product, u.name as uom, p.quantity, p.status, p.total, p.price FROM test.purchase_order as p JOIN test.vendor as v ON p.idvendor = v.idvendor JOIN test.stock as s ON s.idstock = p.idstock JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as pr ON pr.idproduct = puc.idproduct JOIN test.uom as u ON puc.iduom = u.iduom = puc.iduom JOIN test.warehouse as w ON s.idwarehouse = w.idwarehouse WHERE idpurchase_order = ?";

  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createPO = (req, res) => {
  const { idvendor, idstock, status, quantity, price, total } = req.body;
  const values = [idvendor, idstock, status, quantity, price, total];
  const q =
    "INSERT INTO purchase_order (idvendor, idstock,  status, quantity, price, total)  VALUES (?,?,?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updatePO = (req, res) => {
  const { idvendor, idstock, status, quantity, price, total } = req.body;

  const id = req.params.id;
  const values = [idvendor, idstock, status, quantity, price, total, id];

  const q =
    "UPDATE purchase_order SET idvendor = ?,  idstock = ? ,  status = ?, quantity = ?, price = ?, total = ? WHERE idpurchase_order = ?";
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
