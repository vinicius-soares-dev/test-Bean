import { Request, Response } from "express";
import axios from "axios";


class Team {
  constructor (
      public readonly pokemon1: string, 
      public readonly pokemon2: string, 
      public readonly pokemon3: string,
      public readonly pokemon4: string,
      public readonly pokemon5: string
  ) {
    this.pokemon1 = pokemon1;
    this.pokemon2 = pokemon2;
    this.pokemon3 = pokemon3;
    this.pokemon4 = pokemon4;
    this.pokemon5 = pokemon5;
  }

  GetSquad() {
    const PokemonTeam = [this.pokemon1, this.pokemon2, this.pokemon3, this.pokemon4, this.pokemon5];
    return PokemonTeam;
  }

}

export const createSquad = async (req: Request, res: Response) => {
  try {
    const { pokemon1, pokemon2, pokemon3, pokemon4, pokemon5 } = req.body;

    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const pokemonList = response.data;
    const namePokemon = pokemonList.results.map((pokemon: any) => pokemon.name);

    if(!namePokemon.includes(pokemon1) || !namePokemon.includes(pokemon2) || !namePokemon.includes(pokemon3) || !namePokemon.includes(pokemon4) || !namePokemon.includes(pokemon5)) {
      return res.status(401).json({ message: "this pokemon doesn't exist" });
    }

    const created = new Team(pokemon1, pokemon2, pokemon3, pokemon4, pokemon5);
    res.status(201).json({ message: "success", data: created.GetSquad()});
    return;
  } catch(error) {
    return res.status(500).json({ message: "Server internal error", error: error});
  }

}