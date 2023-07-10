import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import background from "../imgs/cooking.jpg"

const NewRecipe = (props) => {
  const navigate = useNavigate()
  const [recipeName, setRecipeName] = useState ("")
  const [recipeIngredients, setRecipeIngredients] = useState("")
  const [recipeInstructions, setRecipeInstructions] = useState("")
  const [errors, setErrors] = useState({})
  
  const submitHandler = (e) => {
      e.preventDefault()
      axios.post('http://localhost:4000/api/new/recipe', {
        recipeName,
        recipeIngredients,
        recipeInstructions
      })
          .then((res) => {
              console.log(res)
              console.log(res.data)
              setRecipeName([...recipeName, res.data])
              navigate(`/all/recipes`)
          })
          .catch((err) => {
              console.log(err)
              setErrors(err.response.data.errors)
          })
  }

return (
  <div style={{backgroundImage: `url(${background})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  width: '100vw',
  height: '100vh'}}>
      <div>
          <h2 style={{
            textAlign: "center", 
            marginBottom:"30px",
            padding: "10px", 
            fontFamily: "Amatic SC",
            fontWeight: "bold",
            fontSize: "40px",
            }}>Add a New Recipe</h2>
          </div>
      <div>
          <form
          onSubmit={submitHandler}>
          <label style={{
            marginLeft: "10px",
            fontFamily: "Amatic SC",
            marginLeft: "30px",
            fontWeight: "bold",
            fontSize: "30px"}}
        >Recipe Name </label>
          <br/>
          <input style={{height: "30px", 
            width: "580px", 
            margin: "10px",
            padding: "20px",
            paddingLeft: "10px",
            marginLeft: "30px",
            borderRadius: "10px",
            border:"black solid 2px",}}type="text" onChange={(e)=>setRecipeName(e.target.value)}/>
          { errors.recipeName?
          <p style={{color: "red",
          marginLeft: "30px",
          fontFamily: "Amatic SC",
          fontWeight: "bold",
          fontSize: "25px",}}>{errors.recipeName.message}</p>: null}
          <br/>
          <label style={{
            marginLeft: "10px",
            fontFamily: "Amatic SC",
            marginLeft: "30px",
            fontWeight: "bold",
            textAlign: "top",
            fontSize: "30px"}}>Ingredients </label>
          <br/>
          <textarea placeholder='Please list ingredients using commas to seperate...'
            style={{height: "150px", width: "580px", margin: "10px",
            paddingLeft: "10px",
            marginLeft: "30px",
            borderRadius: "10px",
            border:"black solid 2px"}}
            type="text" onChange={(e)=>setRecipeIngredients(e.target.value)}/>
          { errors.recipeIngredients?
          <p style={{color: "red",
          marginLeft: "30px",
          fontFamily: "Amatic SC",
          fontWeight: "bold",
          fontSize: "25px",}}>{errors.recipeIngredients.message}</p>: null}
          <br/>

          <label style={{
            marginLeft: "10px",
            fontFamily: "Amatic SC",
            marginLeft: "30px",
            fontWeight: "bold",
            fontSize: "30px"}}>Instructions</label>
          <br/>
          <textarea placeholder='Please list instructions using commas to seperate steps...'
          
          style={{height: "200px", width: "580px", margin: "10px",
            paddingLeft: "10px",
            marginLeft: "30px",
            borderRadius: "10px",
            border:"black solid 2px"}}
            type="text" onChange={(e)=>setRecipeInstructions(e.target.value)}/>
          { errors.recipeInstructions?
          <p style={{color: "red",
          marginLeft: "30px",
          fontFamily: "Amatic SC",
          fontWeight: "bold",
          fontSize: "25px",}}>{errors.recipeInstructions.message}</p>: null}
          <br/>
          <button style={{margin: "10px",
          textAlign: "center",
          fontFamily: "Amatic SC",
          fontWeight: "bold",
          marginLeft: "30px",
          fontSize: "30px", 
          borderRadius: "15px",
          padding: "0px 15px",
          backgroundColor: "white"}}>Add a recipe!</button>
          </form>
      </div>
  </div>
)
}

export default NewRecipe