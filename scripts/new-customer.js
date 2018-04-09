'use strict'

//Imports 
import { API_URL } from './config.js'
import { postData, navigate } from './utils.js'
import { AuthorizationError, InputError } from './errors.js'

//Models 

export let customer = {'name' : '', 'phone' : '', 'email' : '', 'address' : '' }

//Views 

export function render() {
  return `
  
    <article>
  
      <input type='text' placeholder='name' required minlength=2 id='name' name='name' oninput='nameInput(event)'>
      <input type='tel' placeholder='phone' required minlength=10 id='phone' name='phone' oninput='phoneInput(event)'>
      <input type='text' placeholder='email' required id='email' name='email' oninput='emailInput(event)'>
      <input type='text' placeholder='address' id='address' name='address'oninput='addressInput(event)'>
  
      <button onclick='submit()'> SUBMIT </button>

    </article>  
  `
}

//Actions 

export const nameInput = (e) => customer.name = e.target.value 
export const phoneInput = (e) => customer.phone = e.target.value 
export const emailInput = (e) => customer.email = e.target.value
export const addressInput = (e) => customer.address = e.target.value

export async function submit() {
  
  try {
    
    

    let response = await postData(API_URL+'customers', customer)
    
    if (response.message) {
      navigate('../views/dash.html')
    }
    
    
  }catch(err) {
    
    if (err instanceof AuthorizationError ) {
      alert(`Session expired, we're logging you out`)
    }else if (err instanceof InputError) {
      alert('something wrong with the input data')
    }else { console.log(err) }
    
  }
  
}


export function addToPage() {
  
  document.getElementById('new-customer').innerHTML = render()
}
