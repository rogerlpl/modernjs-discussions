/**
 * Valida las variables del documento de operaciones GraphQL.
 * @param {string} operationsDoc - El documento de operaciones GraphQL.
 * @param {Object} variables - Las variables a validar.
 * @returns {Object} - Un objeto con un mensaje de error si se encuentran variables no válidas.
 */
function validateGraphQLVariables(operationsDoc, variables) {
  const errors = [];
  try {
    // Extraemos las variables únicas del documento de operaciones
    const variableNamesSet = new Set(
      operationsDoc.match(/\$[a-zA-Z0-9_]+/g) || [],
    );
    const variableNames = [...variableNamesSet];
    // Verificamos si todas las variables requeridas están presentes en el objeto de variables
    variableNames?.forEach(variableName => {
      const variableWithoutDollar = variableName.slice(1); // Eliminamos el símbolo de dólar
      if (!(variableWithoutDollar in variables)) {
        errors.push(variableWithoutDollar);
      }
    });

    if (errors.length === 0) {
      return null; // Todas las variables están presentes
    } else {
      return {
        message: `Las siguientes variables son requeridas: ${errors.join(
          ', ',
        )}.`,
      };
    }
  } catch (error) {
    return {
      message: error,
    };
  }
}

/**
 * Realiza una solicitud GraphQL.
 * @param {string} operationsDoc - El documento de operaciones GraphQL.
 * @param {Object} variables - Las variables para la operación GraphQL.
 * @param {string} operationName - El nombre de la operación GraphQL.
 * @returns {Object} - Los datos de la respuesta GraphQL o un objeto de errores.
 */
export async function fetchGraphQL(operationsDoc, variables, operationName) {
  // Validamos las variables antes de realizar la solicitud GraphQL
  const validationError = validateGraphQLVariables(operationsDoc, variables);

  if (validationError) {
    return { errors: validationError };
  }

  // Continuamos con la solicitud GraphQL
  const result = await fetch('https://beta.pokeapi.co/graphql/v1beta', {
    method: 'POST',
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  const { errors, data } = await result.json();

  if (errors) {
    // Manejar errores de GraphQL
    return { errors: errors };
  }

  // Realizar acciones con los datos recibidos
  return data;
}

export function extractNameImage(data) {

  const resultado = data?.pokemon_v2_pokemon?.map(pokemon => {
    const name = pokemon.name;
    const url = pokemon.pokemon_v2_pokemonsprites[0].sprites.other.home.front_default;

    return { name, url };
  });

  return resultado;
}
