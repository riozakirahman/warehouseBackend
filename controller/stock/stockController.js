import db from "../../db/db.js";

const getStock = (req, res) => {
  const q =
    "SELECT s.idstock, s.idwarehouse, w.warehouse_name, s.idproductUnitConversion, u.iduom, u.name as uom, p.idproduct, p.code, p.name as product, s.qty FROM stock as s JOIN warehouse as w ON w.idwarehouse = s.idwarehouse  JOIN productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN product as p ON puc.idproduct = p.idproduct JOIN uom as u ON puc.iduom = u.iduom";
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const getStockkById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT s.idstock, s.idwarehouse, w.warehouse_name, s.idproductUnitConversion, u.iduom, u.name as uom, p.idproduct, p.code, p.name as product, s.qty FROM stock as s JOIN warehouse as w ON w.idwarehouse = s.idwarehouse  JOIN productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN product as p ON puc.idproduct = p.idproduct JOIN uom as u ON puc.iduom = u.iduom WHERE s.idstock = ?";

  db.query(q, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const createStock = (req, res) => {
  const { idwarehouse, idproductUnitConversion, qty } = req.body;
  const values = [idwarehouse, idproductUnitConversion, qty];
  const q =
    "INSERT INTO stock (idwarehouse,idproductUnitConversion, qty)  VALUES (?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateStock = (req, res) => {
  const { idwarehouse, idproductUnitConversion, qty } = req.body;

  const id = req.params.id;
  const values = [idwarehouse, idproductUnitConversion, qty, id];

  const q =
    "UPDATE stock SET idwarehouse = ? ,idproductUnitConversion = ?, qty = ? WHERE idstock = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const deleteStock = (req, res) => {
  const id = req.params.id;
  const deleteStock = `DELETE FROM stock WHERE idstock = ?`;
  db.query(deleteStock, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export { getStock, getStockkById, createStock, deleteStock, updateStock };
