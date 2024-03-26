import React, { useEffect, useState } from 'react';
import { get } from '@api/pokemon';
import { SimpleGrid, Image, Paper } from '@mantine/core';
import { PokemonCard } from './../PokemonCard';
export const Pokemons = props => {
  const [data, setData] = useState([]);

  function refreshData() {
    get().then(fetchData => {
      setData(fetchData);
    });
  }

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <SimpleGrid
    cols={{ base: 1, sm: 2, lg: 5 }}
    spacing={{ base: 10, sm: 'xl' }}
    verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
    {data.map((item, index) => (
      <PokemonCard key={index} name={item.name} url={item.url}/>
    ))}

    </SimpleGrid>

  );
};
