import React from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Login from './components/Login';
import Signup from './components/Signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import ShowAllRecipes from './components/ShowAllRecipes';
import NewRecipe from './components/NewRecipe';
import OneRecipe from './components/OneRecipe';
import { useAuthContext } from './hooks/useAuthContext';
import EditRecipe from './components/EditRecipe';
import SearchResults from './components/SearchResults';


function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
      <Navigation />
        <Routes>
          <Route path="/login" element= {!user ? <Login/>: <Navigate to="/"/>}/>
          <Route path="/signup" element= {!user ? <Signup/>: <Navigate to="/"/>}/>
          <Route path="/" element={user ? <Home /> : <Navigate to="/login" />}/>
          <Route path="/all/recipes" element={user ? <ShowAllRecipes /> : <Navigate to="/login" />}/>
          <Route path="/new/recipe" element={user ? <NewRecipe /> : <Navigate to="/login" />}/>
          <Route path="/one/recipe/:id" element={user ? <OneRecipe /> : <Navigate to="/login" />}/>
          <Route path="/update/recipe/:id" element={user? <EditRecipe /> : <Navigate to="/login" />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
