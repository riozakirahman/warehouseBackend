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

const getStock = (req, res) => {
  const q =
    "SELECT s.idstock, s.document_number,s.created_at,s.created_by,s.modified_at,s.modified_by,s.idwarehouse, w.warehouse_name, s.idproductUnitConversion, u.iduom, u.name as uom, p.idproduct, p.code, p.name as product, s.qty FROM stock as s JOIN warehouse as w ON w.idwarehouse = s.idwarehouse  JOIN productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN product as p ON puc.idproduct = p.idproduct JOIN uom as u ON puc.iduom = u.iduom";
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

const getStockkById = (req, res) => {
  const id = req.params.id;
  const q =
    "SELECT s.idstock,s.document_number,s.created_at,s.created_by,s.modified_at,s.modified_by, s.idwarehouse, w.warehouse_name, s.idproductUnitConversion, u.iduom, u.name as uom, p.idproduct, p.code, p.name as product, s.qty FROM stock as s JOIN warehouse as w ON w.idwarehouse = s.idwarehouse  JOIN productUnitConversion as puc ON s.idproductUnitConversion = puc.idproductUnitConversion JOIN product as p ON puc.idproduct = p.idproduct JOIN uom as u ON puc.iduom = u.iduom WHERE s.idstock = ?";

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

const createStock = (req, res) => {
  const { idwarehouse, idproductUnitConversion, qty, created_by } = req.body;
  const values = [idwarehouse, idproductUnitConversion, qty, created_by];
  const q =
    "INSERT INTO stock (idwarehouse,idproductUnitConversion, qty, created_by)  VALUES (?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

const updateStock = (req, res) => {
  const { idwarehouse, idproductUnitConversion, qty, modified_by } = req.body;

  const id = req.params.id;
  const values = [idwarehouse, idproductUnitConversion, qty, modified_by, id];

  const q =
    "UPDATE stock SET idwarehouse = ? ,idproductUnitConversion = ?, qty = ?, modified_by = ? WHERE idstock = ? ";
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
