import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);
  const [inputTextFilter, setTextFilter] = useState('');
  const [column, setColumn] = useState('population');
  const [quantity, setQuantity] = useState(0);
  const [quantityForm, setQuantityForm] = useState('maior que');

  const columns = ({ target: { value } }) => {
    setColumn(value);
  };

  const getQuantity = ({ target: { value } }) => {
    setQuantity(value);
  };

  const getQuantitys = ({ target: { value } }) => {
    setQuantityForm(value);
  };

  const FiltersForm = () => {
    if (quantityForm === 'maior que') {
      const data = planetsList.filter((event) => +event[column] > +quantity);
      setPlanetsList(data);
    }

    if (quantityForm === 'menor que') {
      const data = planetsList.filter((event) => +event[column] < +quantity);
      setPlanetsList(data);
    }

    if (quantityForm === 'igual A') {
      const data = planetsList.filter((event) => +event[column] === +quantity);
      setPlanetsList(data);
    }
  };

  useEffect(() => {
    const Api = async () => {
      const endpoint = await fetch('https://swapi.dev/api/planets');
      const { results } = await endpoint.json();
      const data = results.map(
        ({
          name,
          climate,
          created,
          diameter,
          edited,
          films,
          gravity,
          orbital_period: orbital,
          population,
          rotation_period: rotation,
          surface_water: surface,
          terrain,
          url,
        }) => ({
          name,
          rotation_period: rotation,
          surface_water: surface,
          terrain,
          url,
          edited,
          films,
          climate,
          diameter,
          created,
          gravity,
          orbital_period: orbital,
          population,
        }),
      );
      setPlanetsList(data);
    };
    Api();
  }, []);

  const handleInputTextFilter = ({ target: { value } }) => {
    setTextFilter(value);
  };

  const planets = useMemo(
    () => ({
      planetsList,
      inputTextFilter,
      handleInputTextFilter,
      column,
      columns,
      quantity,
      quantityForm,
      getQuantity,
      getQuantitys,
      FiltersForm,
    }),
    [planetsList, inputTextFilter, column, quantity, quantityForm],
  );
  return (
    <StarWarsContext.Provider value={ planets }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default StarWarsProvider;

// AJUDA DA MENTORIA
