'use strict'

//Imports 
import { API_URL } from './config.js'
import { postData, navigate } from './utils.js'

// Model 

export let email = {'email': ''}

// View 

const render = () => {
		return `
			<article>
				<input type="email" name="email"  id="email" placeholder="email"  oninput="emailInput(event)">
				
				<button onclick="submit()"> Register/Login </button>
				
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
	email = Object.assign({}, {'email': e.target.value})
	
}

export const submit = () => {
	
	
	const body = email
	
	console.log(JSON.stringify(body))
	
	/*postData(API_URL+'login', body)
		.then(data => {
			console.log(data)
			navigate('../views/auth.html')
		})
		.catch(err => console.log(err))*/
	
	try {
		let response = postData(API_URL+'login', body)
		
		if (response.ok) {
			navigate('../views/auth.html')
		}
		
		
	}catch(err) {
		console.log(err)
	}
	
}

export function addToPage() {
	document.getElementById('login').innerHTML = render()
}

