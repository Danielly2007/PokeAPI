import axios from 'axios';

// Função para buscar o Pokémon pelo nome
export const fetchPokemonByName = async (poke) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${poke.toLowerCase()}`);
        return response.data;  // Retorna os dados do Pokémon
    } catch (error) {
        throw new Error('Erro ao buscar Pokémon. Tente novamente.');
    }
};
