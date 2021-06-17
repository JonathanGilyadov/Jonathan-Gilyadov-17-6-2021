import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Select, MenuItem } from "@material-ui/core/";
import { useDispatch, useSelector } from "react-redux";
import { changeTempType } from "../actions/ChangeTempType";

const Header = () => {
  const dispatch = useDispatch();
  const tempType = useSelector((state) => state.tempType);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
      className="border-bottom"
    >
      <div className="container">
        <NavLink to="/" className="navbar-brand">
          Herolo Weather App
        </NavLink>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav>
            <NavLink
              className="nav-link"
              to={`/forecasts/215854/Tel Aviv`}
              activeStyle={{ color: "black" }}
            >
              Forecasts
            </NavLink>
            <NavLink
              className="nav-link"
              activeStyle={{ color: "black" }}
              exact
              to="/favorites"
            >
              Favorites
            </NavLink>
          </Nav>
          <Nav className="ml-auto">
            <Select
              onChange={(e) => dispatch(changeTempType(e.target.value))}
              value={tempType}
            >
              <MenuItem value="CELSIUS">Celsius</MenuItem>
              <MenuItem value="FAHRENHEIT">Fahrenheit</MenuItem>
            </Select>
          </Nav>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default Header;
