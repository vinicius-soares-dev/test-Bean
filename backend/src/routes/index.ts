import express from "express";
import { AllPokemons, GetEvolution, SearchByName } from "../controllers/PokemonListController";
import { RegisterUser} from "../controllers/Register";
import { validatePasswordMiddleware, validateUserExistenceMiddleware, validateUsernameMiddleware } from "../middlewares/validateCreateUser";
import { Login } from "../controllers/Login";
import { createSquad } from "../controllers/TeamPokemon";
import { verifyJWT } from "../auth/verifyAuth";
const routes =  express.Router();

routes.get("/pokemon", verifyJWT, AllPokemons);
routes.get("/pokemon/:name", verifyJWT, SearchByName);
routes.get("/pokemon/:name/evolution", verifyJWT, GetEvolution);
routes.post("/register", validateUsernameMiddleware, validatePasswordMiddleware, validateUserExistenceMiddleware, RegisterUser);
routes.post("/login", validateUsernameMiddleware, validatePasswordMiddleware, Login);
routes.post("/pokemon/team", verifyJWT, createSquad);


export default routes;
