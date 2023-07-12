import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import background from '../imgs/cooking.jpg';
import { useAuthContext } from '../hooks/useAuthContext';

const EditRecipe = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuthContext();
  const [recipe, setRecipe] = useState({
    recipeName: '',
    recipeIngredients: '',
    recipeInstructions: '',
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
        setRecipe(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user, id]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setRecipe((prevRecipe) => ({ ...prevRecipe, [name]: value }));
  };

  const validateForm = () => {
    const errors = {};
  
    if (!recipe.recipeName) {
      errors.recipeName = 'Recipe name is required';
    } else if (recipe.recipeName.length < 3) {
      errors.recipeName = 'Recipe name must be at least 3 characters long';
    }
  
    if (!recipe.recipeIngredients) {
      errors.recipeIngredients = 'Ingredients list is required';
    } else if (recipe.recipeIngredients.length < 3) {
      errors.recipeIngredients = 'Ingredients list must have at least 3 characters';
    }
  
    if (!recipe.recipeInstructions) {
      errors.recipeInstructions = 'Recipe instructions are required';
    } else if (recipe.recipeInstructions.length < 3) {
      errors.recipeInstructions = 'Recipe instructions must have at least 3 characters';
    }
  
    setErrors(errors);
  
    return Object.keys(errors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!user) {
      setErrors({ message: 'You must be logged in' });
      return;
    }

    const isValid = validateForm();

    if (isValid) {
      axios
        .patch(`http://localhost:4000/api/update/recipe/${id}`, recipe, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          navigate(`/one/recipe/${id}`);
        })
        .catch((err) => {
          console.log(err);
          setErrors(err.response.data.errors);
        });
    }
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
          Update Your Recipe
        </h2>
      </div>
      <div>
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
            Update your recipe!
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
