import React from "react";
import Tab from "./Tab";
import { NavLink } from "react-router-dom";

export default function Header(props) {
  return (
    <div className="tabs">
      <Tab>
        <NavLink to="/" activeClassName="isActive" exact={true}>
          Home
        </NavLink>
      </Tab>
      <Tab>
        <NavLink to="/about" activeClassName="isActive">
          About
        </NavLink>
      </Tab>
      <Tab>
        <NavLink to="/features" activeClassName="isActive">
          Features
        </NavLink>
      </Tab>
    </div>
  );
}
