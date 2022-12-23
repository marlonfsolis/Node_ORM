const {initModels} = require("../../sequelize/models");

import {Sequelize, DataTypes, QueryTypes} from "sequelize";
import {Configuration as config} from '../utils/configuration';
import {dbDebug} from '../startup/debuggers';

const sequelize = new Sequelize({
    dialect: "mysql",
    host: config.db.host,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name,

    dialectOptions: {
        multipleStatements: true
    }
});

initModels(sequelize, DataTypes);

export default sequelize;

export const QueryDefaultOptions = {raw: true, type: QueryTypes.SELECT};

