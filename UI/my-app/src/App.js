import './App.css';
import { Home } from './Home';
import { Category } from './Category';
import { Item } from './Item';
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light justify-content-center">
          <ul className="navbar-nav">
            <li className="nav-item m-1">
              <NavLink to="/home" className="btn">
                Shop
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink to="/category" className="btn">
                Category
              </NavLink>
            </li>
            <li className="nav-item m-1">
              <NavLink to="/item" className="btn">
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
