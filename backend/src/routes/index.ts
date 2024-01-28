import express from "express";
import { verifyJWT } from "../auth/verifyAuth";
import { 
  AllPokemons, 
  GetEvolution, 
  SearchByName 
} from "../controllers/PokemonListController";
import { RegisterUser} from "../controllers/Register";
import { 
  validatePasswordMiddleware, 
  validateUserExistenceMiddleware, 
  validateUsernameMiddleware 
} from "../middlewares/validateCreateUser";
import { Login } from "../controllers/Login";
import { createSquad } from "../controllers/TeamPokemon";

const routes =  express.Router();

/*
  * @route    GET api/pokemon
  * @desc     Returns all the pokemons in the database
  * @accesss  Protected (requires JWT)
*/
routes.get("/pokemon", verifyJWT, AllPokemons);

/*
  * @route    GET api/pokemon/:name
  * @desc     Returns details of a specific Pokémon
  * @accesss  Protected (requires JWT)
*/
routes.get("/pokemon/:name", verifyJWT, SearchByName);

/*
  * @route    GET api/pokemon/:name/evolution
  * @desc     Returns evolution details of a specific Pokémon
  * @accesss  Protected (requires JWT)
*/
routes.get("/pokemon/:name/evolution", verifyJWT, GetEvolution);


/*
  * @route    POST api/register
  * @desc     Register a new user
  * @accesss  Public
*/
routes.post("/register", validateUsernameMiddleware, validatePasswordMiddleware, validateUserExistenceMiddleware, RegisterUser);

/*
  * @route    POST api/login
  * @desc     User Login
  * @accesss  Public
*/
routes.post("/login", validateUsernameMiddleware, validatePasswordMiddleware, Login);

/*
  * @route    POST api/pokemon/team
  * @desc     Create a Pokémon team
  * @accesss  Protected (requires JWT)
*/
routes.post("/pokemon/team", verifyJWT, createSquad);


export default routes;
