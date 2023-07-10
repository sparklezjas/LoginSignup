import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Navigation = () => {
  const [randomRecipeId, setRandomRecipeId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/all/recipes');
        const data = await response.json();

        const randomIndex = Math.floor(Math.random() * data.length);
        const randomRecipe = data[randomIndex];
        setRandomRecipeId(randomRecipe.id);
      } catch (error) {
        console.log('Error fetching recipes:', error)
      }
    };
    fetchRecipes();
  }, []);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    } catch (error) {
      console.log('Error navigating to search results:', error);
    }
  }
  

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
          }}
        >
          My Virtual Cookbook
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px', margin:"10px" }} navbarScroll>
            <Nav.Link style={{fontWeight: "bold", margin:"10px", fontSize: "20px"}} as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link style={{fontWeight: "bold", margin:"10px", fontSize: "20px"}} as={Link} to="/new/recipe">
              Add a Recipe
            </Nav.Link>
            <Nav.Link style={{fontWeight: "bold", margin:"10px", fontSize: "20px"}} as={Link} to="/all/recipes">
              View Cookbook
            </Nav.Link>
            {randomRecipeId && (
              <Nav.Link as={Link} to={`/one/recipe/${randomRecipeId}`}>
                Random Recipe
              </Nav.Link>
            )}
          </Nav>
          {/* <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <Button variant="outline-success" onClick={handleSearch}>
              Search
            </Button>
          </Form> */}
          <NavDropdown
            style={{
              textAlign: 'center',
              marginLeft: '30px',
              fontFamily: 'Amatic SC',
              fontWeight: 'bold',
              fontSize: '30px',
            }}
            title="Profile"
            id="navbarScrollingDropdown"
          >
            <NavDropdown.Item as={Link} to='/login'>Login</NavDropdown.Item>
            <NavDropdown.Item as={Link} to='/signup'>Sign Up</NavDropdown.Item>
            <NavDropdown.Divider />
          </NavDropdown>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
