
module.exports = {
  "development": {
    "username": process.env.NODE_ORM__USERNAME,
    "password": process.env.NODE_ORM_PASSWORD,
    "database": process.env.NODE_ORM_DBNAME,
    "host": process.env.NODE_ORM_HOST,
    "dialect": "mysql",

  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};
