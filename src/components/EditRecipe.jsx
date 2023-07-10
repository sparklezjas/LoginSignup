import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link } from 'react-router-dom'
import background from "../imgs/cooking.jpg"

const EditRecipe = (props) => {
const navigate = useNavigate()
const [recipe, setRecipe] = useState ({
    recipeName:'',
    recipeIngredients: '',
    recipeInstructions: ''
})
const {id} = useParams()
const [errors, setErrors] = useState({})

useEffect(() => {
    axios.get(`http://localhost:4000/api/one/recipe/${id}`)
    .then((res) => {
        setRecipe(res.data)
    })
    .catch((err) => {
        console.log(err);
    });
}, [])

const changeHandler = (e) => {
    const { name, value } = e.target
    setRecipe((prevRecipe) => ({...prevRecipe, [name]: value}))
}

const submitHandler = (e) => {
    e.preventDefault()
    axios.patch(`http://localhost:4000/api/update/recipe/${id}`, recipe)
        .then((res) => {
            console.log(res)
            navigate(`/one/recipe/${id}`)
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
            }}>Update Your Recipe</h2>
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
            border:"black solid 2px",}}type="text" onChange={changeHandler} value={recipe.recipeName} name='recipeName'/>
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
        <textarea
            style={{height: "150px", width: "580px", margin: "10px",
            paddingLeft: "10px",
            marginLeft: "30px",
            borderRadius: "10px",
            border:"black solid 2px"}}
            type="text" onChange={changeHandler} value={recipe.recipeIngredients} name='recipeIngredients'/>
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
        <textarea
        
        style={{height: "200px", width: "580px", margin: "10px",
            paddingLeft: "10px",
            marginLeft: "30px",
            borderRadius: "10px",
            border:"black solid 2px"}}
            type="text" onChange={changeHandler} value={recipe.recipeInstructions} name='recipeInstructions'/>
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
        backgroundColor: "white"}}>Update your recipe!</button>
        </form>
    </div>
</div>
)
}

export default EditRecipe