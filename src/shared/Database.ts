import {Sequelize, DataTypes} from "sequelize";
import {initModels} from "../models";

import {Configuration as config} from '../utils/configuration';
import {dbDebug} from '../startup/debuggers';

const sequelize = new Sequelize({
    dialect: "mysql",
    host: config.db.host,
    username: config.db.username,
    password: config.db.password,
    database: config.db.name
});

initModels(sequelize, DataTypes);

export default sequelize;

