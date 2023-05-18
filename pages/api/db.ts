import sql from "mysql2";

export async function getDB() {
  try {
    const connection = sql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      multipleStatements: true
    });
    connection.connect((err) => {
      if (err) {
        console.error("Error connecting to the database:", err);
        return;
      }
      console.log("Connected to the database.");
    });

    return connection;
  } catch (error) {
    console.log(error);
    return null;
  }
}
