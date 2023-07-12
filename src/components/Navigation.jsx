import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext';

const Navigation = () => {
  const [randomRecipeId, setRandomRecipeId] = useState(null);
  const navigate = useNavigate()

  const { logout } = useLogout()
  const handleClick = () => {
    logout()
  }
  const { user } = useAuthContext()

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid style={{ backgroundColor: '#ffebdd' }}>
        <Navbar.Brand
          as={Link}
          to="/"
          style={{
            textAlign: 'center',
            fontFamily: 'Amatic SC',
            fontWeight: 'bold',
            fontSize: '30px',
            paddingLeft: "20px"
          }}
        >
          My Virtual Cookbook
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px', margin: "10px" }} navbarScroll>
            <Nav.Link style={{ fontWeight: "bold", margin: "10px", fontSize: "20px" }} as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link style={{ fontWeight: "bold", margin: "10px", fontSize: "20px" }} as={Link} to="/new/recipe">
              Add a Recipe
            </Nav.Link>
            <Nav.Link style={{ fontWeight: "bold", margin: "10px", fontSize: "20px" }} as={Link} to="/all/recipes">
              View Cookbook
            </Nav.Link>
            {randomRecipeId && (
              <Nav.Link as={Link} to={`/one/recipe/${randomRecipeId}`}>
                Random Recipe
              </Nav.Link>
            )}
          </Nav>
          {user ? (
            <Nav>
              <Nav.Link>
                <span style={{ 
                  fontWeight: "bold",
                  fontSize: "20px" }}>{user.email}</span>
              </Nav.Link>
              <Nav.Link>
                <button style={{
          textAlign: "center",
          fontFamily: "Amatic SC",
          fontWeight: "bold",
          marginLeft: "10px",
          fontSize: "25px",
          borderRadius: "15px",
          padding: "0px 15px",
          backgroundColor: "white"}}
                onClick={handleClick}>
                  Log Out
                </button>
              </Nav.Link>
            </Nav>
          ) : (
            <Nav>
              <Nav.Link style={{ fontWeight: "bold", margin: "10px", fontSize: "20px" }} as={Link} to='/login'>
                Login
              </Nav.Link>
              <Nav.Link style={{ fontWeight: "bold", margin: "10px", fontSize: "20px" }} as={Link} to='/signup'>
                Sign Up
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
