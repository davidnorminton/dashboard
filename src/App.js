/* global chrome */
import './css/App.css';
import * as React from "react";
import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import Sidebar from './Components/Sidebar';
import { useEffect, useState } from 'react';

// Pages
import Home from './Pages/Home/Home';
import Todo from './Pages/Todo/Todo';
import About from './Pages/About/About';
import TodoSelected from './Pages/Todo/TodoSelected';
import Bookmarks from './Pages/Bookmarks/Bookmarks';
import SettingsPage from './Pages/Settings/SettingsPage';

// Plugins
import Magento from './Pages/Magento/Magento';
import Linux from './Pages/Linux/Linux';

function App() {

    const [ enableMagento, setEnableMagento ] = useState(true);
    const [ enableLinux, setEnableLinux ] = useState(true);
    const [ searchProvider, setSearchProvider  ] = useState('google');


    useEffect(function () {
      chrome.storage.local.get(
          [
              'setting_magento',
              'setting_linux'
          ]
      ).then(function (result) {
          if (Object.keys(result).length > 0) {  
              Object.keys(result).forEach(function (key) {
                switch(key) {
                  case 'setting_magento':
                    setEnableMagento(result.setting_magento);
                    break;
                  case 'setting_linux':
                    setEnableLinux(result.setting_linux);
                    break;
                  default:
                    break;
                }
            })
          }
          console.log(enableLinux)
      });

  }, []);

  return (
    <div className="App">

      <MemoryRouter>
        <Sidebar 
          enableMagento={ enableMagento }
          enableLinux={ enableLinux }
        />
        <Routes>
          <Route path="/" element={<Home />}/> 
          <Route path="/about" element={<About />} />
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

          <Route path="/bookmarks" element={<Bookmarks />}/> 
          <Route path="/linux" element={<Linux />}/> 
          <Route path="/magento" element={<Magento />}/> 

          <Route 
            path="/settings" 
            element={<SettingsPage
            enableMagento={ enableMagento } 
            setEnableMagento={ setEnableMagento }
            searchProvider={ searchProvider }
            setSearchProvider={ setSearchProvider }
            enableLinux={ enableLinux }
            setEnableLinux={ setEnableLinux }
          />} />
        </Routes>
      </MemoryRouter>
      
    </div>
  );
}

export default App;


