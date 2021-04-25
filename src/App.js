import * as React from 'react';
import Board from './components/Board';
import BoardContextProvider from './context/BoardContext';
import defaultData from './assets/data.json';
import './App.css';

const columns = [
  { id: 1, title: 'To Do' },
  { id: 2, title: 'Doing' },
  { id: 3, title: 'Done' },
];

function App() {
  return (
    <div className="App">
      <BoardContextProvider>
          <h1>My board</h1>
        <Board columns={columns} defaultData={defaultData} />
      </BoardContextProvider>
    </div>
  );
}

export default App;
