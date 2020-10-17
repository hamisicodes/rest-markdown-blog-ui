import React from "react";
import { NavLink } from "react-router-dom";
import { Container,  Menu , Dropdown } from "semantic-ui-react";
import { authenticationService } from "../services";

const Navbar = () => {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <NavLink to="/">
            <Menu.Item as="li" header>
              React-MarkDown-Blog
            </Menu.Item>
          </NavLink>
          {authenticationService.isAuthenticated ? (
            <>
            <Dropdown text="Profile" pointing className="link item">
            <Dropdown.Menu>
              <Dropdown.Header>Profile</Dropdown.Header>
              <Dropdown.Item onClick={ ()=> authenticationService.logout()}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <NavLink to="/create">
            <Menu.Item as="li">Create a Post</Menu.Item>
            </NavLink>
           </>

          ) : (
            <>
            <NavLink to="/login">
              <Menu.Item as="li">login</Menu.Item>
            </NavLink>
            <NavLink to="/login">
            <Menu.Item as="li">Sign up</Menu.Item>
            </NavLink>
            </>
          )}

          <NavLink to="/">
            <Menu.Item as="li">Posts</Menu.Item>
          </NavLink>

        </Container>
      </Menu>
    </div>
  );
};

export default Navbar;


