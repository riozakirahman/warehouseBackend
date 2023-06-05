import db from "../db/db.js";

const createCompany = (req, res) => {
  const {
    company_name,
    company_address,
    phone_no,
    idcountry,
    idcity,
    idprovince,
    currency_code,
  } = req.body;
  const values = [
    company_name,
    company_address,
    phone_no,
    currency_code,
    idcountry,
    idprovince,
    idcity,
  ];
  const q =
    "INSERT INTO company (company_name, company_address, phone_no, currency_code, idcountry, idprovince, idcity ) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

export { createCompany };
