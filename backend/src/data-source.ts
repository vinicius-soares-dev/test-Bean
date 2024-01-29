import "reflect-metadata";
import { DataSource } from "typeorm";
import { Users } from "./entity/Users";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "postgres-database",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "article",
  synchronize: true,
  logging: false,
  entities: [Users],
})

