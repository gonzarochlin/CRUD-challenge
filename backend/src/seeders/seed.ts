import Department from '../models/department.model';

async function seedDatabase() {
    try {
        const departments = [
            { name: 'Engineering' },
            { name: 'Human Resources' },
            { name: 'Marketing' },
            { name: 'Sales' },
        ];

        // Check if the departments are already in the database
        for (const dept of departments) {
            const [department, created] = await Department.findOrCreate({
                where: { name: dept.name },
                defaults: dept,
            });
            
            if (created) {
                console.log(`Department ${dept.name} added to the database.`);
            }
        }
    } catch (error) {
        console.error('Error seeding the database:', error);
    }
}

export default seedDatabase;
