'use strict'

//Imports 
import { API_URL } from './config.js'
import { postData, navigate } from './utils.js'
import { InputError } from './errors.js' 

// Model 

export let email = {'email': ''}

// View 

const render = () => {
		return `
			<article class='article'>

        <p class='article-text'> We'll send you an email with an Auth token to Login or Register </p>
      
				<input class='input' type="email" name="email"  id="email" placeholder="email" required oninput="emailInput(event)">
				
				<button class='btn pointer' onclick="submit()"> Confirm </button>
				
			</article>
		`
}

// Update | Actions 

export const emailInput = (e) => {
	
	//let emailText = e.target.value
	//console.log(emailText)
	
	/*function getEmail() {
		return new e.target.value
	}*/
    
  let input_email = document.getElementById('') 
    
	email = Object.assign({}, {'email': e.target.value})
	
}

export const submit = async () => {
	
	
	const body = email
	
	console.log(JSON.stringify(body))
	
	/*postData(API_URL+'login', body)
		.then(data => {
			console.log(data)
			navigate('../views/auth.html')
		})
		.catch(err => console.log(err))*/
	
	try {
    
		let response = await postData(API_URL+'login', body)
		
		if (response.message) {
			navigate('../views/auth.html')
		}
		
		
	}catch(err) {
    
    if (err instanceof InputError) {
      alert('input a correct email')
    }
    else {
      alert('sorry something went wrong, try again later')
    }
		console.log(err)
	}
	
}

export function addToPage() {
	document.getElementById('login').innerHTML = render()
}

