import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import background from '../imgs/cooking.jpg';
import { useAuthContext } from '../hooks/useAuthContext';

const NewRecipe = (props) => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [recipe, setRecipe] = useState({
    recipeName: '',
    recipeIngredients: '',
    recipeInstructions: '',
  });
  const [errors, setErrors] = useState({});

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      setErrors({ message: 'You must be logged in' });
      return;
    }

    // Validate recipe fields
    const validationErrors = {};
    if (!recipe.recipeName) {
      validationErrors.recipeName = 'Recipe name is required';
    } else if (recipe.recipeName.length < 3) {
      validationErrors.recipeName = 'Recipe name must be at least 3 characters long';
    } else if (recipe.recipeName.length > 100) {
      validationErrors.recipeName = 'Recipe name cannot exceed 100 characters';
    }

    if (!recipe.recipeIngredients) {
      validationErrors.recipeIngredients = 'Ingredients list is required';
    } else if (recipe.recipeIngredients.length < 3) {
      validationErrors.recipeIngredients = 'Ingredients list must be at least 3 characters long';
    } else if (recipe.recipeIngredients.length > 500) {
      validationErrors.recipeIngredients = 'Ingredients list cannot exceed 500 characters';
    }

    if (!recipe.recipeInstructions) {
      validationErrors.recipeInstructions = 'Recipe instructions are required';
    } else if (recipe.recipeInstructions.length < 3) {
      validationErrors.recipeInstructions = 'Recipe instructions must be at least 3 characters long';
    } else if (recipe.recipeInstructions.length > 500) {
      validationErrors.recipeInstructions = 'Recipe instructions cannot exceed 500 characters';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    axios
      .post(
        'http://localhost:4000/api/new/recipe',
        {
          recipeName: recipe.recipeName,
          recipeIngredients: recipe.recipeIngredients,
          recipeInstructions: recipe.recipeInstructions,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setRecipe({
          recipeName: '',
          recipeIngredients: '',
          recipeInstructions: '',
        });
        navigate(`/all/recipes`);
      })
      .catch((err) => {
        console.log(err);
        if (err.response && err.response.data && err.response.data.errors) {
          setErrors(err.response.data.errors);
        } else {
          setErrors({ message: 'An error occurred while creating the recipe' });
        }
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
      <div>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '30px',
            padding: '10px',
            fontFamily: 'Amatic SC',
            fontWeight: 'bold',
            fontSize: '40px',
          }}
        >
          Add a New Recipe
        </h2>
      </div>
      <div
        style={{
          width: '100vw',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {errors.message && (
          <p
            style={{
              color: 'red',
              marginLeft: '30px',
              fontFamily: 'Amatic SC',
              fontWeight: 'bold',
              fontSize: '25px',
            }}
          >
            {errors.message}
          </p>
        )}
        <form onSubmit={submitHandler}>
          <label
            style={{
              marginLeft: '10px',
              fontFamily: 'Amatic SC',
              marginLeft: '30px',
              fontWeight: 'bold',
              fontSize: '30px',
            }}
          >
            Recipe Name
          </label>
          <br />
          <input
            style={{
              height: '30px',
              width: '580px',
              margin: '10px',
              padding: '20px',
              paddingLeft: '10px',
              marginLeft: '30px',
              borderRadius: '10px',
              border: 'black solid 2px',
            }}
            type="text"
            onChange={changeHandler}
            value={recipe.recipeName}
            name="recipeName"
          />
          {errors.recipeName && (
            <p
              style={{
                color: 'red',
                marginLeft: '30px',
                fontFamily: 'Amatic SC',
                fontWeight: 'bold',
                fontSize: '25px',
              }}
            >
              {errors.recipeName}
            </p>
          )}
          <br />
          <label
            style={{
              marginLeft: '10px',
              fontFamily: 'Amatic SC',
              marginLeft: '30px',
              fontWeight: 'bold',
              textAlign: 'top',
              fontSize: '30px',
            }}
          >
            Ingredients
          </label>
          <br />
          <textarea
            style={{
              height: '150px',
              width: '580px',
              margin: '10px',
              paddingLeft: '10px',
              marginLeft: '30px',
              borderRadius: '10px',
              border: 'black solid 2px',
            }}
            type="text"
            onChange={changeHandler}
            value={recipe.recipeIngredients}
            name="recipeIngredients"
          />
          {errors.recipeIngredients && (
            <p
              style={{
                color: 'red',
                marginLeft: '30px',
                fontFamily: 'Amatic SC',
                fontWeight: 'bold',
                fontSize: '25px',
              }}
            >
              {errors.recipeIngredients}
            </p>
          )}
          <br />

          <label
            style={{
              marginLeft: '10px',
              fontFamily: 'Amatic SC',
              marginLeft: '30px',
              fontWeight: 'bold',
              fontSize: '30px',
            }}
          >
            Instructions
          </label>
          <br />
          <textarea
            style={{
              height: '200px',
              width: '580px',
              margin: '10px',
              paddingLeft: '10px',
              marginLeft: '30px',
              borderRadius: '10px',
              border: 'black solid 2px',
            }}
            type="text"
            onChange={changeHandler}
            value={recipe.recipeInstructions}
            name="recipeInstructions"
          />
          {errors.recipeInstructions && (
            <p
              style={{
                color: 'red',
                marginLeft: '30px',
                fontFamily: 'Amatic SC',
                fontWeight: 'bold',
                fontSize: '25px',
              }}
            >
              {errors.recipeInstructions}
            </p>
          )}
          <br />
          <button
            style={{
              margin: '10px',
              textAlign: 'center',
              fontFamily: 'Amatic SC',
              fontWeight: 'bold',
              marginLeft: '30px',
              fontSize: '30px',
              borderRadius: '15px',
              padding: '0px 15px',
              backgroundColor: 'white',
            }}
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewRecipe;
