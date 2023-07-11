import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ShowAllRecipes from './components/ShowAllRecipes';
import NewRecipe from './components/NewRecipe';
import OneRecipe from './components/OneRecipe';

import EditRecipe from './components/EditRecipe';
import SearchResults from './components/SearchResults';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path="/login" element = {<Login/>}/>
          <Route path="/signup" element = {<Signup/>}/>
          <Route path="/" element={<Home />} />
          <Route path="/all/recipes" element={<ShowAllRecipes />} />
          <Route path="/new/recipe" element={<NewRecipe />} />
          <Route path="/one/recipe/:id" element={<OneRecipe />} />
          <Route path="/update/recipe/:id" element={<EditRecipe />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
