import React from 'react';
import { NavLink } from 'react-router-dom';
import CurrentDateTime from './CurrentDateTime';

function NavBar (props) {
  const { user, onSignOut = () => {} } = props;
  const handleSignOut = event => {
    event.preventDefault();
    onSignOut();
  }

  return (
    <nav className="NavBar">
      <NavLink exact to="/">Home</NavLink>
      <NavLink exact to="/search">Search</NavLink>
      <NavLink exact to="/map">Map</NavLink>
      <NavLink exact to="/posts/new">New Item</NavLink>
      <NavLink exact to="/posts">Items</NavLink>
      {user
        ? [
            <span key="1">Hello, {user.full_name}</span>,
            <a key="2" href="/sign_out" onClick={handleSignOut}>
              Sign Out
            </a>
          ]
        : [
            <NavLink key="1" exact to="/sign_in">
              Sign In
            </NavLink>,
            <NavLink key="2" exact to="/sign_up">
              Sign Up
            </NavLink>
          ]}
      <CurrentDateTime />
    </nav>
  )
}

export default NavBar;
