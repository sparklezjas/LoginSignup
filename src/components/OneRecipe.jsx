import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import background from '../imgs/cooking.jpg';
import { useAuthContext } from '../hooks/useAuthContext';

const OneRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [recipe, setRecipe] = useState({
    recipeName: '',
    recipeIngredients: '',
    recipeInstructions: [],
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!user) {
      return;
    }

    axios
      .get(`http://localhost:4000/api/one/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setRecipe((prevRecipe) => ({
          ...prevRecipe,
          recipeName: res.data.recipeName,
          recipeIngredients: res.data.recipeIngredients,
          recipeInstructions: res.data.recipeInstructions
            .split(',')
            .map((instruction) => instruction.trim()),
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, id]);

  const deleteHandler = () => {
    axios
      .delete(`http://localhost:4000/api/delete/recipe/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        navigate('/all/recipes');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
      }}
    >
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
        {recipe.recipeName}
      </h2>
      <div style={{ margin: '30px' }}>
        <label
          style={{
            marginLeft: '30px',
            padding: '10px',
            fontFamily: 'Amatic SC',
            fontWeight: 'bold',
            fontSize: '35px',
          }}
        >
          Ingredients:
        </label>
        <ul style={{ marginLeft: '30px', fontSize: '24px' }}>
          {recipe.recipeIngredients.split(',').map((ingredient, index) => (
            <li key={index}>{ingredient.trim()}</li>
          ))}
        </ul>
        {errors.recipeIngredients ? (
          <p style={{ color: 'red' }}>{errors.recipeIngredients.message}</p>
        ) : null}
      </div>
      <div style={{ margin: '30px' }}>
        <label
          style={{
            marginLeft: '30px',
            padding: '10px',
            fontFamily: 'Amatic SC',
            fontWeight: 'bold',
            fontSize: '35px',
          }}
        >
          Instructions:
        </label>
        <ol style={{ marginLeft: '30px', fontSize: '24px' }}>
          {recipe.recipeInstructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
        {errors.recipeInstructions ? (
          <p style={{ color: 'red' }}>{errors.recipeInstructions.message}</p>
        ) : null}
      </div>
      <Link to={`/update/recipe/${id}`} style={{ textDecoration: 'none' }}>
        <Button
          variant="primary"
          style={{
            backgroundColor: 'white',
            color: 'black',
            borderColor: 'black',
            margin: '10px',
            marginLeft: '70px',
          }}
        >
          Edit Recipe
        </Button>
      </Link>
      <Button
        variant="primary"
        style={{ backgroundColor: '#ffebdd', color: 'black', borderColor: 'black', margin: '10px' }}
        onClick={deleteHandler}
      >
        Delete Recipe
      </Button>
    </div>
  );
};

export default OneRecipe;
