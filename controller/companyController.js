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
const getCompany = (req, res) => {
  const idcompany = req.query.idcompany;
  let q;
  if (idcompany) {
    q = `SELECT company_name, company_address, phone_no, currency_code,countryName, provinceName, cityName FROM company JOIN country ON company.idcountry = country.idcountry JOIN province ON company.idprovince = province.idprovince JOIN city ON company.idcity = city.idcity WHERE company.idcompany = ${idcompany}`;
  } else {
    q =
      "SELECT company_name, company_address, phone_no, currency_code,countryName, provinceName, cityName FROM company JOIN country ON company.idcountry = country.idcountry JOIN province ON company.idprovince = province.idprovince JOIN city ON company.idcity = city.idcity";
  }
  db.query(q, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};

export { createCompany, getCompany };
