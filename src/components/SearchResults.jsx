import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('query') || ''
  const [results, setResults] = useState([]);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/recipes/search?query=${query}`);
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.log('Error searching recipes:', error);
      }
    };

    fetchData();
  }, [query]);
  console.log('Query:', query);
  console.log('Results:', results);
  return (
    <div>
      <h2>Search Results</h2>
      {results.length === 0 ? (
  <p>No matching recipes found.</p>
) : (
  <ul>
    {results.map((recipe) => (
      <li key={recipe.id}>{recipe.recipeName}</li>
    ))}
  </ul>
)}
    </div>
  );
};

export default SearchResults;
