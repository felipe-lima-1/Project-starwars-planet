import React from 'react';
import './App.css';
// import Filters from './Components/Filters';
import Planets from './Components/Planets';
import Table from './Components/Table';
import StarWarsProvider from './Context/StarWarsProvider';

function App() {
  return (
    <div>
      <StarWarsProvider>
        <Table />
        <Planets />
        {/* <Filters /> */}
      </StarWarsProvider>
    </div>
  );
}

export default App;
