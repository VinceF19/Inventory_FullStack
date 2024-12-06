import './App.css';
import { Home } from './Home';
import { Category } from './Category';
import { Item } from './Item';
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App Container">
        <h3 className="d-flex justify-content-center m-3">React JS Frontend</h3>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink to="/home" className="btn btn-light btn-outline-primary">
                Home
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink to="/category" className="btn btn-light btn-outline-primary">
                Category
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink to="/item" className="btn btn-light btn-outline-primary">
                Item
              </NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/item" element={<Item />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
