// Description: This file is used to create the database and tables in CockroachDB.
// This is not the file required to run the backend
// This should run one time, if Database is created, no need to run it.
// This itself is an another application
// Command to run this application: node .\Database_Management\dbManagement.js
 
const { Client } = require('pg');
const connectionString = process.env.connectionString;


const client = new Client({
  connectionString: connectionString,
  application_name: "$database_management"
});

const queries = [
  "DROP TABLE IF EXISTS messages, users, admin",
  "CREATE TABLE IF NOT EXISTS admin (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), eiin INTEGER UNIQUE, password STRING)",
  "INSERT INTO admin (eiin, password) VALUES (123456, 'admin')",
  "INSERT INTO admin (eiin, password) VALUES (123454, 'teacher')",
  "CREATE TABLE IF NOT EXISTS users (id UUID PRIMARY KEY DEFAULT gen_random_uuid(), eiin INTEGER, username STRING UNIQUE, password STRING)",
];

(async () => {
  try {
    // Connect to CockroachDB
    await client.connect();

    for (const query of queries) {
      await client.query(query);
    }

    await client.end();
  } catch (err) {
    console.log(`Error connecting/executing queries: ${err}`);
  } finally{
    console.log('Database and tables created successfully!');
  }

  process.exit();
})();
