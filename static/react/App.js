import React from 'react';
import { Route, Routes, HashRouter, Link } from "react-router-dom";
import SettingsPage from './Settings/SettingsPage';
import ServerWindow from './ServerWindow/ServerWindow';


function App() {
  return (
    <HashRouter>
      <nav id="navigation">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
        </ul>
      </nav>
      <div id="content">
        <Routes>
          <Route path="/" element={<ServerWindow />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
