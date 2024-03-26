import {
  GetPokemons,
} from './_query';
import { fetchGraphQL,extractNameImage } from '../_utility/graphQL';

export const get = async () => {
  const result = await fetchGraphQL(GetPokemons,{limit:100});

  return extractNameImage(result);
};
