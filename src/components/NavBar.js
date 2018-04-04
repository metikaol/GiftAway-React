import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  import map_icon from '../images/Map_icon.png';

function NavBar (props) {
  const { user, onSignOut = () => {} } = props;
  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
  }

  return (

      <Navbar className="navbar navbar-light bg-info sticky-top mb-0" expand>

      <NavLink id="GiftAway" exact to="/posts" >GiftAway</NavLink>

      <NavLink exact to="/map"><img className="navbar-brand" src={map_icon} alt="logo"/></NavLink>


      <Nav className="ml-auto" navbar style={{color: "white", fontSize: 20, padding: 4}}>

      <NavLink className="mr-4" style={{color: "white", fontSize: 20}} exact to="/posts/new">New Item</NavLink>
      {user
        ? [
            <span key="1">Hello, {user.first_name}</span>,
            <a key="2" href="/sign_out" onClick={handleSignOut} className="mr-4 ml-4" style={{color: "white", fontSize: 20}}>
              Sign Out
            </a>
          ]
        : [
            <NavLink className="mr-4" style={{color: "white", fontSize: 20}} key="1" exact to="/sign_in">
              Sign In
            </NavLink>,
            <NavLink className="mr-4" style={{color: "white", fontSize: 20}} key="2" exact to="/sign_up">
              Sign Up
            </NavLink>
          ]}
       </Nav>
    </Navbar>
  )
}

export default NavBar;
