import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planetsList, setPlanetsList] = useState([]);

  useEffect(() => {
    const Api = async () => {
      const endpoint = await fetch('https://swapi.dev/api/planets');
      const { results } = await endpoint.json();
      const data = results.filter((element) => delete element.residents);
      setPlanetsList(data);
    };
    Api();
  }, []);

  const planets = useMemo(() => ({ planetsList }), [planetsList]);
  return (
    <StarWarsContext.Provider value={ planets }>
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.shape(),
}.isRequired;

export default StarWarsProvider;
