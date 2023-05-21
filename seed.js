const { Sequelize } = require('sequelize');

module.exports = {
    seedDatabase: async () => {
        try {
          // Create the tasks table if it doesn't exist
          const createTableQuery = `
            CREATE TABLE IF NOT EXISTS tasks (
              id SERIAL PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              description TEXT NOT NULL,
              due_date DATE NOT NULL,
              status VARCHAR(255)
            )
          `;
      
          await sequelize.query(createTableQuery);
      
          // Insert seed data using custom insert queries
          const insertQuery = `
            INSERT INTO tasks (title, description, due_date, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5)
          `;
      
          // Execute the insert query for each seed data item
          for (const data of seedData) {
            const { title, description, dueDate } = data;
            const createdAt = new Date();
            const updatedAt = new Date();
      
            await sequelize.query(insertQuery, {
              bind: [title, description, dueDate, createdAt, updatedAt],
            });
          }
      
          console.log('Database seeded successfully');
        } catch (error) {
          console.error('Error seeding database:', error);
        } finally {
          // Close the database connection
          await sequelize.close();
        }
      },
}

  