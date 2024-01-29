import {useState, useEffect } from "react";
import Header from "../../components/header";
import axios from "axios";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';


import "../../assets/styles/home.css";

// Images Pokemon
import beedrill from "../../assets/img/pokemons/beedrill.gif";
import bulbasaur from "../../assets/img/pokemons/bulbasaur.gif";
import blastoise from "../../assets/img/pokemons/blastoise.gif";
import butterfree from "../../assets/img/pokemons/butterfree.gif";
import caterpie from "../../assets/img/pokemons/caterpie.gif";
import charizard from "../../assets/img/pokemons/charizard.gif";
import charmander from "../../assets/img/pokemons/charmander.gif";
import charmeleon from "../../assets/img/pokemons/charmeleon.gif";
import ivysaur from "../../assets/img/pokemons/ivysaur.gif";
import kakuna from "../../assets/img/pokemons/kakuna.gif";
import metapod from "../../assets/img/pokemons/metapod.gif";
import pidgeot from "../../assets/img/pokemons/pidgeot.gif";
import pidgeotto from "../../assets/img/pokemons/pidgeotto.gif";import pidgey from "../../assets/img/pokemons/pidgey.gif";
import raticate from "../../assets/img/pokemons/raticate.gif";
import rattata from "../../assets/img/pokemons/rattata.gif";
import squirtle from "../../assets/img/pokemons/squirtle.gif";
import wartortle from "../../assets/img/pokemons/wartortle.gif";
import weedle from "../../assets/img/pokemons/weedle.gif";
import venusaur from "../../assets/img/pokemons/venusaur.gif";



export const Home = () => {
  const [pokemonList, setPokemonList] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pokemonPerPage = 5;
  const [selectedPokemon, setSelectedPokemon] = useState<string | undefined>(undefined);
  const [squadPokemon, setSquadPokemon] = useState<string[]>([]);
  const [evolutionDetails, setEvolutionDetails] = useState<string[]>([]);



  type PokemonData = {
    beedrill: string;
    bulbasaur: string;
    blastoise: string;
    butterfree: string;
    caterpie: string;
    charizard: string;
    charmander: string;
    charmeleon: string;
    ivysaur: string;
    kakuna: string;
    metapode: string;
    pidgey: string
    pidgeot: string;
    pidgeotto: string;
    raticate: string;
    rattata: string;
    squirtle: string;
    wartortle: string;
    weedle: string;
    venusaur: string;
    [key: string]: string; // Adiciona uma assinatura de índice
  };



  const pokemonData:  PokemonData = {
    beedrill: beedrill,
    bulbasaur: bulbasaur,
    blastoise: blastoise,
    butterfree: butterfree,
    caterpie: caterpie,
    charizard: charizard,
    charmander: charmander, 
    charmeleon: charmeleon,
    ivysaur: ivysaur,
    kakuna: kakuna,
    metapode: metapod,
    pidgey: pidgey,
    pidgeot: pidgeot,
    pidgeotto: pidgeotto,
    raticate: raticate,
    rattata: rattata,
    squirtle: squirtle,
    wartortle: wartortle,
    weedle: weedle,
    venusaur: venusaur,
  }


  function GetImage({ title }: { title: string | undefined }) {
    if(title) {
        const selectPokemon = title;
        const filterPokemon: string | undefined = pokemonData[selectPokemon];

        return (
          <>
            <section className="image">
              { filterPokemon ? (
                <>
                  <img src={filterPokemon} alt={`${selectPokemon}-Imagem`} />
                  <button onClick={() => handleChangeSquad(selectPokemon)} className={evolutionDetails.length > 0 ? "focusOnDisplay" : "button-squad"}>Add to Squad</button>
                  <button onClick={() => handleEvolutionChange(selectPokemon)} className="button-evolution">Ver evolução</button>
                  <p className="description-evolution">{evolutionDetails ? evolutionDetails : null}</p>
                </>
      

              ) : (
                null
              )  
            }
            </section>
          </>
        )
    }
    return (
      null
    )
  
  }

  const handleChangeSquad = (props: string) => {
    setSquadPokemon(prevSquad => [...prevSquad, props]);
  }

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await axios.get<string[]>(`http://localhost:3000/pokemon?page=${currentPage}`);
        setPokemonList(response.data);
      } catch (error) {
        console.error('Error fetching Pokemon list:', error);
      }
    };

    fetchPokemonList();
  }, [currentPage]);

  useEffect(() => {
    if (squadPokemon.length > 5) {
      setSquadPokemon([]);
    }
  }, [squadPokemon]);

  const handlePrevPage = () => {
    if(currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };


  const startIndex = (currentPage - 1) * pokemonPerPage;
  const displayedPokemons = pokemonList.slice(startIndex, startIndex + pokemonPerPage);

  const handlePokemonChange = (event: React.ChangeEvent<object>, newValue: string | undefined) => {
    setSelectedPokemon(newValue);
    console.log(event);
    
  };

  const handleEvolutionChange = (selectedPokemon: string) => {
    if (selectedPokemon) {
      switch (selectedPokemon) {
        case 'beedrill':
          setEvolutionDetails(['Kakuna -> Weedle -> Beedrill']);
          break;
        case 'bulbasaur':
          setEvolutionDetails(['Bulbasaur -> Ivysaur -> Venusaur']);
          break;
        case 'blastoise':
          setEvolutionDetails(['Squirtle -> Wartortle -> Blastoise']);
          break;
        case 'butterfree':
          setEvolutionDetails(['Caterpie -> Metapod -> Butterfree']);
          break;
        case 'caterpie':
          setEvolutionDetails(['Caterpie -> Metapod -> Butterfree']);
          break;
        case 'charizard':
          setEvolutionDetails(['Charmander -> Charmeleon -> Charizard']);
          break;
        case 'charmander':
          setEvolutionDetails(['Charmander -> Charmeleon -> Charizard']);
          break;
        case 'charmeleon':
          setEvolutionDetails(['Charmander -> Charmeleon -> Charizard']);
          break;
        case 'ivysaur':
          setEvolutionDetails(['Bulbasaur -> Ivysaur -> Venusaur']);
          break;
        case 'kakuna':
          setEvolutionDetails(['Weedle -> Kakuna']);
          break;
        case 'metapod':
          setEvolutionDetails(['Caterpie -> Metapod -> Butterfree']);
          break;
        default:
          setEvolutionDetails([]); 
      }
    } else {
      setEvolutionDetails([]); 
    }
  }

  
  return (
    <>
     <Header title="Pokémon"/>
     <section className="container">
        <h1 className="title-container">Pokemon List</h1>

        <Stack spacing={2} sx={{ width: 300 }}>
          <Autocomplete
            freeSolo
            id="free-solo-2-demo"
            disableClearable
            options={pokemonList.map((option) => option)}
            value={selectedPokemon}
            title={selectedPokemon}
            onChange={handlePokemonChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search a Pokémon"
                InputProps={{
                  ...params.InputProps,
                  type: 'search',
                }}
              />
            )}
          />
        </Stack>
        
        <ul className={selectedPokemon ? "focusOnDisplay" : "pokemons-list"}>
        {displayedPokemons.map((pokemon, index) => (
              <li 
                key={index} 
              >{pokemon}</li>
            ))}
        </ul>

        <section className={selectedPokemon ? "focusOnDisplay" : "pokemons-page"}>
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous Page
            </button>
            <span> Page {currentPage} </span>
            <button onClick={handleNextPage}>
              Next Page
            </button>
        </section>

        <GetImage title={selectedPokemon}/>
        

        {
          squadPokemon?.length > 0 && (
            <section className="container-squad">
                <h2 className="title-container">Squad Pokémon</h2>
                <ul className="squad-list">
                  {squadPokemon.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
            </section>
            
          )
        }


    </section>
    </>
    
  )
}