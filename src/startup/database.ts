import {Express} from "express";

import {dbDebug} from './debuggers';
import sequelize from "../shared/Database";


const createDbConnection = (app: Express) => {
    dbDebug("Creating database connection pool...");

    // Sequelize
    (async () => {
        try {
            await sequelize.authenticate();
            app.locals.sequelize = sequelize;
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    })();
}

export default createDbConnection;
