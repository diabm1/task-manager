require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const Sequelize = require("sequelize");
const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const seedData = [
    { title: 'Task 1', description: 'Task 1 description', dueDate: new Date().toISOString().slice(0, 10) },
    { title: 'Task 2', description: 'Task 2 description', dueDate: new Date().toISOString().slice(0, 10) },
    { title: 'Task 3', description: 'Task 3 description', dueDate: new Date().toISOString().slice(0, 10) },
  ];
  

const seedDatabase = async () => {
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
      INSERT INTO tasks (title, description, due_date)
      VALUES ($1, $2, $3)
    `;

    // Execute the insert query for each seed data item
    for (const data of seedData) {
      const { title, description, dueDate } = data;

      await sequelize.query(insertQuery, {
        bind: [title, description, dueDate],
      });
    }

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  } finally {
    // Close the database connection
    await sequelize.close();
  }
};

module.exports = seedDatabase;
