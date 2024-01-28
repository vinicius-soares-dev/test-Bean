import { Request, Response } from "express";
import axios from "axios";

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

class Team {
  constructor (
      public readonly pokemon1: string, 
      public readonly pokemon2: string, 
      public readonly pokemon3: string,
      public readonly pokemon4: string,
      public readonly pokemon5: string
  ) {}

  GetSquad(): string[] {
    return [this.pokemon1, this.pokemon2, this.pokemon3, this.pokemon4, this.pokemon5];
  }
}

export const createSquad = async (req: Request, res: Response) => {
  try {
    const { pokemon1, pokemon2, pokemon3, pokemon4, pokemon5 } = req.body;

    const response = await axios.get(POKEMON_API_URL);
    const pokemonList = response.data.results.map((pokemon: any) => pokemon.name);

    const isPokemonValid = (pokemon: string) => pokemonList.includes(pokemon);
    if(![pokemon1, pokemon2, pokemon3, pokemon4, pokemon5].every(isPokemonValid)) {
      return res.status(400).json({ message: "One or more of the provided Pokemon does not exist"});
    }

    const created = new Team(pokemon1, pokemon2, pokemon3, pokemon4, pokemon5);
    res.status(201).json({ message: "Squad succesfully created", data: created.GetSquad() });
  } catch(error) {
    console.error(`Error creating Pokemon squad: ${error}`);
    res.status(500).json({ message: "Internal Server Error", error: error });
  }

}