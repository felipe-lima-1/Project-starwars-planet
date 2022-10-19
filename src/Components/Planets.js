import { useContext } from 'react';
import StarWarsContext from '../Context/StarWarsContext';

function Planets() {
  const {
    inputTextFilter,
    handleInputTextFilter,
    quantity,
    quantityForm,
    getQuantity,
    getQuantitys,
    column,
    columns,
    FiltersForm,
    numericFilters,
  } = useContext(StarWarsContext);
  return (
    <form>
      <input
        type="text"
        name="input-text"
        value={ inputTextFilter }
        onChange={ handleInputTextFilter }
        data-testid="name-filter"
      />
      <select
        data-testid="column-filter"
        value={ column }
        onChange={ columns }
      >
        {numericFilters.map((event) => (
          <option key={ event } value={ event }>
            {event}
          </option>
        ))}
      </select>

      <select
        value={ quantityForm }
        onChange={ getQuantitys }
        data-testid="comparison-filter"
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual A">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ quantity }
        onChange={ getQuantity }
      />

      <button type="button" data-testid="button-filter" onClick={ FiltersForm }>
        Adicionar Filtro
      </button>
    </form>
  );
}

export default Planets;
