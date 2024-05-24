import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavList } from "./style";

export const Navigation = () => {
  return (
    <Nav>
      <NavList>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/freemind">FreeMind</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
      </NavList>
    </Nav>
  );
};
