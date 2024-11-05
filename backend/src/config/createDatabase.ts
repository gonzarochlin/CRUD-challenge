import { Dialect, Sequelize } from "sequelize";
import dotenv from 'dotenv';

dotenv.config();

const databaseName = process.env.DB_NAME || 'assessment_database'

export const createDatabaseIfNotExists = async () => {
    const sequelize = new Sequelize({
        username: process.env.DB_USERNAME || 'your_username',
        password: process.env.DB_PASSWORD || 'your_password',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT) || 5432,
        dialect: 'postgres' as Dialect,
        logging: false,
    });

    try {
        // Connect to the PostgreSQL server
        await sequelize.authenticate();
        console.log('Connection to PostgreSQL has been established successfully.');

        // Check if the database exists
        await sequelize.query(`SELECT 1 FROM pg_database WHERE datname = '${databaseName}'`)
            .then(async (result) => {
                if (result[0].length === 0) {
                    // Create the database if it does not exist
                    await sequelize.query(`CREATE DATABASE "${databaseName}"`);
                    console.log(`Database "${databaseName}" created successfully.`);
                } else {
                    console.log(`Database "${databaseName}" already exists.`);
                }
            });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw(error);
    } finally {
        await sequelize.close();
    }
};