import * as React from "react";
import { NavLink } from "react-router-dom";

const Header: React.FunctionComponent = () => {
  return (
    <>
      <header>
        <h1>Library App</h1>
        <hr />
        <div className="links">
          <NavLink to="/" className={({ isActive }) =>(isActive ? " active" : "link" )}>
            Books List
          </NavLink>
          <NavLink to="/add" className={({ isActive }) =>(isActive ? " active" : "link" )} >
            Add Book
          </NavLink>
        </div>
      </header>
    </>
  );
};

export default Header;
