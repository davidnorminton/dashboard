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
import About from './Pages/About';
import TodoSelected from './Pages/TodoSelected';
import SettingsPage from './Pages/Settings/SettingsPage';

function App() {
  return (
    <div className="App">

      <MemoryRouter>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/about" element={<About />} />
          <Route path="/magento" element={<Magento />}/> 
          <Route path="/todo" element={<Todo />} />
          <Route 
              path="/todo/:id" 
              loader={({ params }) => {
                console.log(params.id);
              }}
              // and the action
              action={({ params }) => {}}
              element={<TodoSelected />} 
          />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </MemoryRouter>
      
    </div>
  );
}

export default App;


