import './css/App.css';
import * as React from "react";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import Sidebar from './Components/Sidebar';
// Pages
import Home from './Pages/Home';
import Magento from './Pages/Magento';
import Todo from './Pages/Todo';


function App() {
  return (
    <div className="App">

      <MemoryRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/magento" element={<Magento />}/> 
          <Route path="/todo" element={<Todo />} />
        </Routes>
      </MemoryRouter>
      
    </div>
  );
}

export default App;


