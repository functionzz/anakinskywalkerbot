import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const postgresUser = process.env.PG_USER;
const postgresDB = process.env.PG_DB;
const postgresPass = process.env.PG_PASS;
const postgresHost = process.env.DB_HOST;

const sequelize = new Sequelize(postgresDB, postgresUser, postgresPass, {
    host: postgresHost,
    dialect: 'postgres',
});


export default sequelize;

