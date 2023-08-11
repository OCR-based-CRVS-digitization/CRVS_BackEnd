// db.js
const { Client } = require('pg');
const connectionString = process.env.connectionString;

function createClient() {
  return new Client({
    connectionString: connectionString,
    application_name: "$database_management"
  });
}


async function connectAndExecute(statements) {
  try {
    // Connect to CockroachDB
    await client.connect();

    for (let n = 0; n < statements.length; n++) {
      let result = await client.query(statements[n]);
      if (result.rows[0]) { console.log(result.rows[0].message); }
    }

    await client.end();
  } catch (err) {
    console.log(`error connecting: ${err}`);
  }
}


module.exports = {
  createClient,
  connectAndExecute
};
