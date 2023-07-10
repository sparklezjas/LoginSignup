import React from 'react'
import background from "../imgs/cooking.jpg"

import picture from "../imgs/cookbookPict.jpg"

const Home = () => {
  return (
    <div style={{
    backgroundImage: `url(${background})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: '100vw',
    height: '100vh'}}>
      <h1 style={{
      textAlign:"center",
      padding: "20px", 
      fontFamily:'Amatic SC', 
      fontWeight: 'bold'}}>
        Make the Virtual Cookbook you've always wanted!</h1>
<div style={{margin: "auto", width: "800px"}}>
      <img src={picture} alt='Main Page Pict' 
      style={{width:"800px", 
      border: "solid #d0a88c 4px"}}/>
</div>
    </div>
  )
}

export default Home