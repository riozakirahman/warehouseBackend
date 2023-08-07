import db from "../db/db.js";

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
const createCompany = (req, res) => {
  const {
    company_name,
    company_address,
    phone_no,
    idcountry,
    idcity,
    idprovince,
    currency_code,
    created_by,
  } = req.body;
  const values = [
    company_name,
    company_address,
    phone_no,
    currency_code,
    idcountry,
    idprovince,
    idcity,
    created_by,
  ];
  const q =
    "INSERT INTO company (company_name, company_address, phone_no, currency_code, idcountry, idprovince, idcity, created_by ) VALUES (?, ?, ?, ?, ?, ?, ?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const getCompany = (req, res) => {
  let q =
    "SELECT idcompany, company.document_number,company_name, company_address, phone_no, currency_code,countryName, provinceName, cityName, company.created_at,company.created_by, company.modified_at,company.modified_by,company.document_number, country.idcountry, province.idprovince, city.idcity FROM company JOIN country ON company.idcountry = country.idcountry JOIN province ON company.idprovince = province.idprovince JOIN city ON company.idcity = city.idcity";

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

const getCompanyById = (req, res) => {
  const id = req.params.id;
  let q =
    "SELECT idcompany, company.document_number,company_name, company_address, phone_no, currency_code,countryName, provinceName, cityName, company.created_at,company.created_by, company.modified_at,company.modified_by,company.document_number, country.idcountry, province.idprovince, city.idcity FROM company JOIN country ON company.idcountry = country.idcountry JOIN province ON company.idprovince = province.idprovince JOIN city ON company.idcity = city.idcity WHERE idcompany = ?";
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
const deleteCompany = (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM company WHERE idcompany = ?`;
  db.query(deleteQuery, id, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
const updateCompany = (req, res) => {
  const {
    company_name,
    company_address,
    phone_no,
    currency_code,
    idcountry,
    idprovince,
    idcity,
    modified_by,
  } = req.body;

  const id = req.params.id;
  const values = [
    company_name,
    company_address,
    phone_no,
    currency_code,
    idcountry,
    idprovince,
    idcity,
    modified_by,
    id,
  ];

  const q =
    "UPDATE company SET company_name = ?, company_address = ?, phone_no = ?, currency_code = ?, idcountry = ?, idprovince = ?, idcity = ?, modified_by = ? WHERE idcompany = ? ";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err.sqlMessage);
    }
    return res.json(data);
  });
};
export {
  createCompany,
  getCompany,
  getCompanyById,
  deleteCompany,
  updateCompany,
};
