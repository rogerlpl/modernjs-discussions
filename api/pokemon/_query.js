export const GetPokemons = `
query ExampleQuery($limit: Int) {
  pokemon_v2_pokemon(limit: $limit){
    name
    pokemon_v2_pokemonsprites {
      sprites
    }
  }
}
`;


