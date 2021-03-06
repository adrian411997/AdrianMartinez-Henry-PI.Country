const { Activity, Country, Op } = require("../db");

const getAllCountries = async (req, res, next) => {
  try {
    let { name } = req.query;
    let allData = [];
    if (name) {
      const responseByName = await Country.findAll({
        attributes: ["flag", "name", "continent", "id", "population"],
        through: {
          attributes: [],
        },
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      allData = responseByName;
    } else {
      const myInformationDb = await Country.findAll({
        include: Activity,
      });
      allData = myInformationDb;
    }
    if (allData.length === 0) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(allData);
  } catch (error) {
    next(error);
  }
};

const getCountriesById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let allDataById = [];
    if (id) {
      const DBCountries = await Country.findByPk(id, {
        include: Activity,
      });
      allDataById = [DBCountries];
    }
    return res.json(allDataById);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllCountries,
  getCountriesById,
};
