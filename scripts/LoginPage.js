'use strict'
//import { axios } from 'axios'
//import { API_URL } from '/scripts/config.js'

// Model 

const email = emailInput
const API_URL = 'http://localhost:3000/'

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

function emailInput(e) {
	let emailText = e.target.value
	return emailText
}

function submit() {
	
	const body = { email : emailInput }
	
	postData(API_URL+'login', body)
		.then(data => console.log(data))
		.catch(err => console.log(err))
	
}


function postData(url, data) {
	
	console.log(JSON.stringify(data)) //this is empty for some reason 
	
	return fetch(url, {
		headers : {
			'Content-Type' : 'application/json',
		},
		body : JSON.stringify(data),
		credentials : 'include',
		method : 'POST',
		mode : 'cors',
		
		
	})
	.then(response => response.json)
	.catch(err => console.log('Error:', err.json))
	
}

document.getElementById('login').innerHTML = render()