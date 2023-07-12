import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import background from "../imgs/cooking.jpg";
import { useAuthContext } from '../hooks/useAuthContext';

const ShowAllRecipes = (props) => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [sortOrder, setSortOrder] = useState();
  const {user} = useAuthContext()

  useEffect(() => {
    if(!user){
      return
    }
    axios
      .get('http://localhost:4000/api/all/recipes', {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then((res) => {
        console.log(res);
        setAllRecipes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user]);

  useEffect(() => {
    const recipeOrder = [...allRecipes].sort((first, last) => {
      const oldest = new Date(first.createdAt);
      const newest = new Date(last.createdAt);
      if (sortOrder === 'oldest') {
        return oldest - newest
      } else if (sortOrder === 'alphabet'){
        return first.recipeName.localeCompare(last.recipeName)
      } else {
        return newest - oldest;
      }
    });
    setAllRecipes(recipeOrder);
  }, [sortOrder]);

  const sortByOldest = () => {
    setSortOrder('oldest')
  }

  const sortByNewest = () => {
    setSortOrder('newest')
  }

  const sortByAlphabet = () => {
    setSortOrder('alphabet')
  }

  return (
<div style={{
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
      <div>
        <h2
          style={{
            textAlign: 'center',
            justifyContent: 'center',
            marginBottom: '30px',
            padding: '10px',
            fontFamily: 'Amatic SC',
            fontWeight: 'bold',
            fontSize: '40px',
          }}
        >
          My Cookbook
        </h2>
      </div>
      <div>
        <p style={{ marginLeft: '20px' }}>
          Sort recipes by:
          <Button variant="primary"style={{backgroundColor: 
          "white", color: "black", borderColor:"black",
          margin:"10px"}} onClick={sortByNewest}>Newest</Button>
          <Button variant="primary" style={{backgroundColor: 
          "#ffebdd", color: "black", borderColor:"black",
          margin:"10px"}} onClick={sortByOldest}>Oldest</Button>
          <Button variant="primary"style={{backgroundColor: 
          "white", color: "black", borderColor:"black",
          margin:"10px"}} onClick={sortByAlphabet}>Alphabetical</Button>
        </p>
      </div>
      <hr />
      <div style={{
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',

}}>
        {allRecipes.map((recipe) => (
          <Card style={{ width: '18rem',
          margin: "10px",
          borderRadius: "10px",
          border:"black solid 2px"
          }}
          key={recipe._id}>
            <Card.Body>
              <Card.Title style={{textAlign: "center",             fontFamily: 'Amatic SC',
            fontWeight: 'bold', fontSize: "30px"}}>{recipe.recipeName}</Card.Title>
              <Card.Text>
                <span>{recipe.recipeIngredients}</span>
                <span>{recipe.recipeInstructions}</span>
              </Card.Text>

            </Card.Body>
                          <Link to={`/one/recipe/${recipe._id}`} style={{textDecoration: "none"}}>
                <Button variant="primary" style={{backgroundColor: "#ffebdd", color: "black", borderColor: "black", margin: "10px auto", display: "block"}}>
                  View Recipe
                </Button>
              </Link>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShowAllRecipes;
