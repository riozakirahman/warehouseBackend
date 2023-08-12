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

const getAdj = (req, res) => {
  const q =
    "SELECT idadjustment, adj.created_at, adj.created_by, adj.modified_at, adj.modified_by, adj.document_number,adj.idstock,adjustment_qty,w.idwarehouse,puc.idproductUnitConversion,warehouse_name, p.code, p.name as product,p.idproduct, u.name as uom, u.iduom FROM test.adjustment as adj JOIN test.stock as s ON s.idstock = adj.idstock JOIN test.warehouse as w ON w.idwarehouse = s.idwarehouse JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON u.iduom = puc.iduom;";
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

const getAdjById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT idadjustment, adj.created_at, adj.created_by, adj.modified_at, adj.modified_by,adj.document_number,adj.idstock,adjustment_qty,w.idwarehouse,puc.idproductUnitConversion,warehouse_name, p.code, p.name as product,p.idproduct, u.name as uom, u.iduom FROM test.adjustment as adj JOIN test.stock as s ON s.idstock = adj.idstock JOIN test.warehouse as w ON w.idwarehouse = s.idwarehouse JOIN test.productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN test.product as p ON p.idproduct = puc.idproduct JOIN test.uom as u ON u.iduom = puc.iduom WHERE idadjustment = ?;";

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

const createAdj = (req, res) => {
  const { idstock, adjustment_qty, created_by } = req.body;
  const values = [idstock, adjustment_qty, created_by];
  const q =
    "INSERT INTO adjustment (idstock, adjustment_qty, created_by)  VALUES (?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateAdj = (req, res) => {
  const { adjustment_qty, modified_by } = req.body;
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
    "UPDATE adjustment SET adjustment_qty = ?, modified_by = ? WHERE idadjustment = ?";
  db.query(updateAdj, [adjustment_qty, modified_by, id], (err, data) => {
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
