import db from "../../db/db.js";

const getAdj = (req, res) => {
  const q =
    "SELECT idadjustment, adj.idstock,qtyAdj,s.qty as qtyStock, adj.qtyInStock,w.idwarehouse,puc.idproductUnitConversion,warehouse_name, p.code, p.name as product,p.idproduct, u.name as uom, u.iduom FROM test.adjustment as adj JOIN test.stock as s ON s.idstock = adj.idstock JOIN test.warehouse as w ON w.idwarehouse = s.idwarehouse JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON u.iduom = puc.iduom;";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const getAdjById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT idadjustment, adj.idstock,qtyAdj,s.qty as qtyStock, adj.qtyInStock,w.idwarehouse,puc.idproductUnitConversion,warehouse_name, p.code, p.name as product,p.idproduct, u.name as uom, u.iduom FROM test.adjustment as adj JOIN test.stock as s ON s.idstock = adj.idstock JOIN test.warehouse as w ON w.idwarehouse = s.idwarehouse JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON u.iduom = puc.iduom WHERE idadjustment = ?;";

  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createAdj = (req, res) => {
  const { idstock, qtyAdj } = req.body;

  const getQty = "SELECT qty FROM stock WHERE idstock = ?";
  db.query(getQty, idstock, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const qty = data[0].qty;
    const values = [idstock, qtyAdj, qty];
    const q =
      "INSERT INTO adjustment (idstock, qtyAdj, qtyInStock)  VALUES (?,?,?)";
    db.query(q, values, (err, data) => {
      if (err) {
        return res.json(err.sqlMessage);
      }
      return res.json(data);
    });

    const update = "UPDATE stock SET qty = ? WHERE idstock = ? ";
    const update_values = [qty + qtyAdj, idstock];
    db.query(update, update_values, (err, data) => {
      if (err) {
        return res.json(err.sqlMessage);
      }
      // return res.json(data);
    });
  });
};

const updateAdj = (req, res) => {
  const { idstock, qtyAdj } = req.body;

  const id = req.params.id;

  const selectAdj = "SELECT qtyInStock FROM adjustment WHERE idadjustment = ?";
  db.query(selectAdj, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const { qtyInStock } = data[0];

    const updateStock = "UPDATE stock SET qty = ? WHERE idstock = ?";
    db.query(updateStock, [qtyInStock + qtyAdj, idstock], (err, data) => {
      if (err) {
        return res.json(err.sqlMessage);
      }
    });
    const updateAdj = "UPDATE adjustment SET qtyAdj = ? WHERE idadjustment = ?";
    db.query(updateAdj, [qtyAdj, id], (err, data) => {
      if (err) {
        return res.json(err.sqlMessage);
      }
      return res.json({ qty: qtyInStock + qtyAdj });
    });
  });
};
const deleteAdj = (req, res) => {
  const id = req.params.id;

  const getQtyInStock =
    "SELECT qtyInStock, idstock FROM adjustment WHERE idadjustment = ?";
  db.query(getQtyInStock, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    const { qtyInStock, idstock } = data[0];
    const updateQty = "UPDATE stock SET qty = ? WHERE idstock = ? ";
    db.query(updateQty, [qtyInStock, idstock], (err, data) => {
      if (err) {
        return res.json(err.sqlMessage);
      }
    });
  });
  const values = id;
  const q = `DELETE FROM adjustment WHERE idadjustment = ?`;
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export { getAdj, getAdjById, createAdj, deleteAdj, updateAdj };
