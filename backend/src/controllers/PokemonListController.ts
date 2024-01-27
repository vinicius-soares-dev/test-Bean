import axios from "axios";
import { Request, Response } from "express";

export const AllPokemons = async (req: Request, res: Response) => {
  try {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/');
    const pokemonList = response.data;
    const namePokemon = pokemonList.results.map((pokemon: any) => pokemon.name);
    res.status(200).json(namePokemon);
    return;
    
  } catch (error){
    console.error(error);
  }

}

export const SearchByName = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const details = response.data;
    return res.status(200).json(details);
  } catch (error) {
      return res.status(404).json({ message: "This pokemon does not exist in the pokedex." });
  }
}

export const GetEvolution = async (req: Request, res: Response) => {
  const { name } = req.params;
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`);
    
    if(response.status !== 200) {
      res.status(response.status).json({ message: "Pokemon not found." });
      return;
    }

    const speciesUrl = response.data.species.url;
    const speciesResponse = await axios.get(speciesUrl);
    if(speciesResponse.status !== 200) {
      res.status(speciesResponse.status).json({ message:  'Error getting specie pokemon.'});
      return;
    }

    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    const evolutionChainResponse = await axios.get(evolutionChainUrl);
    if(evolutionChainResponse.status !== 200) {
      res.status(evolutionChainResponse.status).json({ message: "Evolution not found." });
      return;
    }
    const evolutionDetails = parseEvolutionChain(evolutionChainResponse.data.chain);
    res.json(evolutionDetails);
    
  } catch (error) {
    res.status(404).json({ message:  'Error on find Evolution.'});
    return console.error(`error getting pokemon evolution details ${error}.`);
  }
}

function parseEvolutionChain(chain: any): any {
  const evolutionDetails: any[] = [];
  const exploreChain = (currentChain: any) => {
    evolutionDetails.push({
      speciesName: currentChain.species.name,
      evolvesTo: currentChain.evolves_to.map((evolution: any) => evolution.species.name),
    });

    if(currentChain.evolves_to && currentChain.evolves_to.length > 0) {
      currentChain.evolves_to.forEach((nextChain: any) => {
        exploreChain(nextChain);
      });
    }
  };
  exploreChain(chain);
  return evolutionDetails;
}