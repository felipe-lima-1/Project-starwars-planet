import { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function Planets() {
  const { inputTextFilter, handleInputTextFilter } = useContext(StarWarsContext);
  return (
    <form>
      <input
        type="text"
        name="input-text"
        value={ inputTextFilter }
        onChange={ handleInputTextFilter }
        data-testid="name-filter"
      />
    </form>
  );
}

export default Planets;
