import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Routes } from '@modern-js/runtime/router';
import { Pokemons } from './components/Pokemons';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';


export default props => {
  const { basename } = props;

  return (
    <MantineProvider forceColorScheme={'dark'}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route index element={<Pokemons />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};
