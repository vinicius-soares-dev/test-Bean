import axios, { AxiosResponse } from "axios";
import { Request, Response } from "express";

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';


export const AllPokemons = async (req: Request, res: Response) => {
  try {
    const apiResponse = await axios.get(POKEMON_API_URL);
    const { results } = apiResponse.data;
    const pokemonNames = results.map((pokemon: any) => pokemon.name);

    res.status(200).json(pokemonNames);
  } catch (error){
    console.error("Error fetching Pokemon data:", error);
    res.status(500).send("Internal Server Error");
  }

}

export const SearchByName = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const response = await axios.get(`${POKEMON_API_URL}${name}`);
    const details = response.data;

    return res.status(200).json(details);
  } catch (error: any | unknown) {
      if(error.response && error.response.status === 404) {
      return res.status(404).json({ message: `No Pokemon found with the name ${name}` });
    } else {
      return res.status(500).send("Internal Server Error");
    }
  }
}

export const GetEvolution = async (req: Request, res: Response) => {
  const { name } = req.params;

  try {
    const response = await getPokemonDetails(name);
    
    if(response.status !== 200) {
      return res.status(response.status).json({ message: "Pokemon not found." });
    }

    const speciesUrl = response.data.species.url;
    const speciesResponse = await axios.get(speciesUrl);
    if(speciesResponse.status !== 200) {
      return res.status(speciesResponse.status).json({ message:  'Error getting specief of the Pokemon.'});
    }

    const evolutionChainUrl = speciesResponse.data.evolution_chain.url;
    const evolutionChainResponse = await getEvolutionChainDetails(evolutionChainUrl);
    if(evolutionChainResponse.status !== 200) {
      return res.status(evolutionChainResponse.status).json({ message: "Evolution not found." });
    }

    const evolutionDetails = extractEvolutionDetails(evolutionChainResponse.data.chain);
    res.json(evolutionDetails);
    
  } catch (error) {
    console.error(`Error getting Pokemon evolution details: ${error}`);
    return res.status(500).json({ message:  'Internal Server Error'});
  }
}

async function getPokemonDetails(name: string): Promise<AxiosResponse<any>>{
  return axios.get(`${POKEMON_API_URL}${name}/`);
}

async function getEvolutionChainDetails(evolutionChainUrl: string): Promise<AxiosResponse<any>> {
  return axios.get(evolutionChainUrl);
}

function extractEvolutionDetails(chain: any): any[] {
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