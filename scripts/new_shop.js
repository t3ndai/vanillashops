'use strict'

//Imports 
import { API_URL } from './config.js'



//Models 


//Views 

export function renderNewShop() {
  return `
    <article>
  
      <input type='text' placeholder='shop name' >
      <input type='text' placeholder='email' >
      <input type='text' placeholder='phone' >
      <input type='text' placeholder='address' >
  
      <button> SUBMIT </button>
  
    </article>
  `
}


//Actions 

export function addToPage() {
   
   document.getElementById('new-shop').innerHTML = renderNewShop()
}

