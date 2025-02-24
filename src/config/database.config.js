



export default {
    development: {
        username: "amitkumar",
        password: "amit@123",
        database: "User",
        host: "127.0.0.1",
        dialect: "mysql",
        dialectOptions: { bigNumberStrings: true },
    },
    test: {
        username: process.env.CI_DB_USERNAME,
        password: process.env.CI_DB_PASSWORD,
        database: process.env.CI_DB_NAME,
        host: "127.0.0.1",
        port: 3306,
        dialect: "postgres",
        dialectOptions: { bigNumberStrings: true },
    },
    production: {
        username: process.env.PROD_DB_USERNAME,
        password: process.env.PROD_DB_PASSWORD,
        database: process.env.PROD_DB_NAME,
        host: process.env.PROD_DB_HOSTNAME,
        port: process.env.PROD_DB_PORT,
        dialect: "postgres",
        dialectOptions: { bigNumberStrings: true },
    },
};
