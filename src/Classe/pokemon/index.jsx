import React, { useState } from 'react';
import './style.css';
import pokeFoto from '../../assets/image/logo-pokemon.svg';

export default function ApiPokemon() {
    const [poke, setPoke] = useState('');  // Aloca o nome do Pokémon que vem do input
    const [data, setData] = useState(null); // Aloca os dados que vêm da API
    const [error, setError] = useState(''); // Aloca a mensagem de erro

    const handleGetPoke = () => {  // Função chamada ao clicar no botão
        if (!poke) return;  // Se não tiver texto dentro da variável 'poke', não faz nada
        setError('');  // Limpa o erro ao iniciar uma nova busca

        // Fazendo o fetch da API
        fetch(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`)
            .then(res => res.json())
            .then(result => {
                if (result && result.name) {
                    setData(result);  // Se o Pokémon for encontrado, armazena os dados
                } else {
                    setError('Pokémon não encontrado');  // Caso contrário, exibe a mensagem de erro
                }
            })
            .catch(() => {
                setError('Erro ao buscar Pokémon. Tente novamente.');  // Caso ocorra algum erro na requisição
            });
    };

    // Definindo o componente PokemonCard, que será responsável por exibir os dados do Pokémon
    const PokemonCard = ({ id, name, sprite, ability }) => {
        return (
            <div className="card">
                <img src={sprite} alt={`Pokémon ${name}`} />
                <div className="descricao">
                    <p>Nome: {name}</p>
                    <p>ID: {id}</p>
                    <p>Habilidade: {ability}</p>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <img className="pokefoto" src={pokeFoto} alt="" />
            <div className="section-button">
                <input
                    type="text"
                    placeholder="Escreva um Pokémon"
                    onChange={(e) => setPoke(e.target.value)}
                />
                <button disabled={poke.length <= 0} onClick={handleGetPoke}>
                    Capturar
                </button>
            </div>

            {error && <p className="error-message">{error}</p>}

            {data && !error && (
                <div className="card">
                    {/* Card principal do Pokémon */}
                    <div className="cardPrincipal">
                        <img
                            src={data.sprites.versions['generation-v']['black-white'].animated.front_default}
                            alt={`foto do ${poke}`}
                        />
                        <div className="descricao">
                            <p>Nome: {data.name}</p> {/* Parametro Nome */}
                            <p>Id: {data.id}</p>     {/* Parametro id */}
                            <p>Habilidade: {data.abilities[0].ability.name}</p> {/* Parametro id */}
                        </div>
                    </div>

                    
                </div>
            )}
        </div>
    );
}
