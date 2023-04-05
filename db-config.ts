// importe le package dotenv pour accèder au .env
import 'dotenv/config';
// importe mysql pour se connecter à la base
// import mysql, { Connection } from 'mysql2';
import { Pool } from 'pg';

// créer l'objet connection
// const connection: Connection = mysql.createConnection({
//   host: process.env.DB_HOST, // address of the server
//   port: Number(process.env.DB_PORT), // port of the DB server (mysql), not to be confused with the nodeJS server PORT !
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
  ssl: true,
});

// exporte l'objet connection pour l'utiliser ailleurs
export default pool;
