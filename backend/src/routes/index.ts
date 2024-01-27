import express from "express";
import { AllPokemons, GetEvolution, SearchByName } from "../controllers/PokemonListController";
import { RegisterUser} from "../controllers/Register";
import { validatePasswordMiddleware, validateUserExistenceMiddleware, validateUsernameMiddleware } from "../middlewares/validateCreateUser";
import { Login } from "../controllers/Login";
import { createSquad } from "../controllers/TeamPokemon";
const routes =  express.Router();

routes.get("/pokemon", AllPokemons);
routes.get("/pokemon/:name", SearchByName);
routes.get("/pokemon/:name/evolution", GetEvolution);
routes.post("/register", validateUsernameMiddleware, validatePasswordMiddleware, validateUserExistenceMiddleware, RegisterUser);
routes.post("/login", validateUsernameMiddleware, validatePasswordMiddleware, Login);
routes.post("/pokemon/team", createSquad);


export default routes;
