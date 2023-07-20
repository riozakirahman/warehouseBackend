import db from "../../db/db.js";

const getAdj = (req, res) => {
  const q =
    "SELECT idadjustment, adj.idstock,adjustment_qty,w.idwarehouse,puc.idproductUnitConversion,warehouse_name, p.code, p.name as product,p.idproduct, u.name as uom, u.iduom FROM test.adjustment as adj JOIN test.stock as s ON s.idstock = adj.idstock JOIN test.warehouse as w ON w.idwarehouse = s.idwarehouse JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON u.iduom = puc.iduom;";
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
    "SELECT idadjustment, adj.idstock,adjustment_qty,w.idwarehouse,puc.idproductUnitConversion,warehouse_name, p.code, p.name as product,p.idproduct, u.name as uom, u.iduom FROM test.adjustment as adj JOIN test.stock as s ON s.idstock = adj.idstock JOIN test.warehouse as w ON w.idwarehouse = s.idwarehouse JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON u.iduom = puc.iduom WHERE idadjustment = ?;";

  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createAdj = (req, res) => {
  const { idstock, adjustment_qty } = req.body;
  const values = [idstock, adjustment_qty];
  const q = "INSERT INTO adjustment (idstock, adjustment_qty)  VALUES (?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateAdj = (req, res) => {
  const { adjustment_qty } = req.body;
  const id = req.params.id;

  const getStockId = "SELECT idstock FROM adjustment WHERE idadjustment = ?";
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

  const updateAdj =
    "UPDATE adjustment SET adjustment_qty = ? WHERE idadjustment = ?";
  db.query(updateAdj, [adjustment_qty, id], (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    // return res.json(data);
  });
};
const deleteAdj = (req, res) => {
  const id = req.params.id;
  const getStockId = "SELECT idstock FROM adjustment WHERE idadjustment = ?";
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

  const q = `DELETE FROM adjustment WHERE idadjustment = ?`;
  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    // return res.json(data);
  });
};
export { getAdj, getAdjById, createAdj, deleteAdj, updateAdj };
