import db from "../db/db.js";

const createCompany = (req, res) => {
  const { company_name, company_address, phone_no, country, currency_code } =
    req.body;
  const values = [
    company_name,
    company_address,
    phone_no,
    country,
    currency_code,
  ];
  const q =
    "INSERT INTO company (company_name, company_address, phone_no, country, currency_code) VALUES (?, ?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

export { createCompany };
