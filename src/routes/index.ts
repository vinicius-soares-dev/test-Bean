import express from "express";
import { AllPokemons, GetEvolution, SearchByName } from "../controllers/PokemonListController";
const routes =  express.Router();

routes.get("/pokemon", AllPokemons);
routes.get("/pokemon/:name", SearchByName);
routes.get("/pokemon/:name/evolution", GetEvolution)


export default routes;
