import React from "react";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <nav
      id="header"
      className="navbar navbar-expand-lg navbar-light bg-light p-4 mb-3"
    >
      {props.title ? (
        <h3>{props.title}</h3>
      ) : (
        <Link to="/formularios" className="flex-center">
          <figure className="m-0">
            <img src="./icon.png" className="img-thumbnail icon"/>
          </figure>
          <h3 className="ml-3">MeuFormulário</h3>
        </Link>
      )}
    </nav>
  );
};

export default Header;
