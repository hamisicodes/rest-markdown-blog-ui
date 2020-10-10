import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Container,
  Image,
  Menu,
} from 'semantic-ui-react'

const Navbar = () => (
  <div>
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src='/logo.png' style={{ marginRight: '1.5em' }} />
         React-MarkDown-Blog
        </Menu.Item>
        <NavLink to='/'><Menu.Item as='li'>Posts</Menu.Item></NavLink>
        <NavLink to='/create'><Menu.Item as='li'>Create a Post</Menu.Item></NavLink>


      </Container>
    </Menu>



  </div>
)

export default Navbar