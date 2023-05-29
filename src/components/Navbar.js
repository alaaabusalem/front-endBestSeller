import { NavLink } from "react-router-dom";
import logo from '../assets/logo.svg';

export default function Navbar() {
  const logoStyle = {
    width: '130px',
    height: 'auto',
    borderRadius: '40%',
  };

  const navbarStyle = {
    maxHeight: '60px', // Set the desired height
    backgroundColor: '#3A1078', 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={navbarStyle}>
        <div className="container-fluid">
          <img src={logo} alt="book logo" style={logoStyle} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/">Home
                  <span className="visually-hidden">(current)</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/reading">Reading Now</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/wishlist">Wish List</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about">About Us</NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <input className="form-control me-sm-2" type="search" placeholder="Search" />
              <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}
