'use strict'

//Imports 
import { API_URL } from './config.js'
import { postData, navigate } from './utils.js'
import { AuthorizationError, InputError } from './errors.js'

//Models 

export let shop = { 'name' : '', 'phone': '', 'address' : '' }

//Views 

export function renderNewShop() {
  return `
    <article>
  
      <input type='text' placeholder='shop name' required oninput='nameInput(event)'>
      <input type='text' placeholder='phone' required minlength='10' oninput='phoneInput(event)'>
      <input type='text' placeholder='address' required oninput='addressInput(event)'>
  
      <button onclick='submit()'> SUBMIT </button>
  
    </article>
  `
}


//Actions 

export const nameInput = (e) => shop.name = e.target.value //Object.assign({}, {'name' : e.target.value })
export const phoneInput = (e) => shop.phone = e.target.value//Object.assign({}, {'phone' : e.target.value })
export const addressInput = (e) => shop.address = e.target.value //Object.assign({}, {'address' : e.target.value })


export async function submit(){
  console.log(shop)
  
  try {
    
    let response = await postData(API_URL+'shops', shop)
    
    console.log(response)
    
    if (response.message) {
      navigate('../views/dash.html')
    }
    
  }catch(err) {
    
    if (err instanceof InputError) {
      alert('Invalid Input')
    }else if (err instanceof AuthorizationError) {
      alert('Expired session')
    }
    console.log(err)
  }
  
}

export function addToPage() {
   
   document.getElementById('new-shop').innerHTML = renderNewShop()
}

