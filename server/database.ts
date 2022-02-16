import { Client } from "pg";

export class database {
  static instance: database;
  client;

  constructor() {
    database.instance = this;
  }

  async connect() {
    const config = {
      user: process.env.PGUSER,
      password: process.env.PGPASSWORD,
      database: process.env.PGDATABASE,
      port: process.env.PGPORT,
      host: process.env.PGHOST,
      ssl: process.env.PGSSL
        ? {
            rejectUnauthorized: false,
          }
        : false,
    };
    this.client = new Client(config);
    await this.client.connect();
    await this.client.query("SELECT NOW()");
  }

  async addNewTodo(data: { title }) {
    let id = 0;
    while (await this.idExists(id)) {
      id++;
    }

    const query = "INSERT INTO todos(id, title) VALUES($1, $2)";
    const values = [id, data.title];

    await this.client.query(query, values);
  }
  async removeTodo(id: number) {
    const query = "DELETE from todos WHERE id=$1";
    const values = [id];

    await this.client.query(query, values);
  }
  async idExists(id: number): Promise<boolean> {
    const query = "SELECT * FROM todos WHERE id=$1";
    const values = [id];

    const rows = await this.client.query(query, values);
    return rows && rows.rows && rows.rows.length > 0;
  }
  async getTodos() {
    const query = "SELECT * FROM todos";
    const rows = await this.client.query(query);

    if (rows && rows.rows && rows.rows.length > 0) {
      return rows.rows;
    } else {
      return [];
    }
  }
}
