import { createDatabaseIfNotExists } from 'config/createDatabase';
import app from './app';
import sequelize from './config/database';
import seedDatabase from './seeders/seed';

const PORT = process.env.PORT || 80;

const startServer = async () => {
    await createDatabaseIfNotExists();

    sequelize.sync({ alter: true })
        .then(async () => {
            console.log('Database synchronized.');

            // Run the seeding function to add initial data
            await seedDatabase();

            app.listen(PORT, () => {
                console.log(`Server running on port ${PORT}`);
            });
        }).catch(err => {
            console.error('Failed to connect to the database:', err);
        });
}

startServer();