import "express-async-errors";
import "reflect-metadata";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import routes from "./routes";
import { AppDataSource } from "./data-source";

const app = express();

AppDataSource.initialize()
  .then(() => {
    console.log(`Database connected`);
  })
  .catch((error) => {
    console.error("Error connecting to database", error);
    process.exit(1);
  });

app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(routes);

export default app;
