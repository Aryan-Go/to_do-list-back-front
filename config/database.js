import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
const password = process.env.password;
const localhost = process.env.localhost;
const port = process.env.PORT2;

let id = 0;

const db = await mysql.createConnection({
    host:localhost,
    user: "root",
    port: port,
    password:password,
});

export const insert_data = async (title, desc) => {
    await db.query(`USE todo;`);
    await db.query(`INSERT INTO todo_list
        (id, title , description)
        VALUES
        (? ,? , ?)` , [id, title, desc]);
    id++;
    console.log("Data has been added")

}

export const get_data = async () => {
    await db.query(`USE todo;`);
    const [rows] = await db.query(`SELECT * FROM todo_list`);
    console.log(rows);
    return rows;
}