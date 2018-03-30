'use strict'
//import { axios } from 'axios'
//import { API_URL } from '/scripts/config.js'

// Model 

const email = emailInput
const API_URL = 'http://localhost:3000/'

// View 

const render = () => {
		return`
			<article>
				<input type="email" name="email"  id="email" placeholder="email"  oninput="emailInput(event)">
				
				<button onclick="submit()"> Register/Login </button>
				
			</article>
		`
}

// Update | Actions 

function emailInput(e) {
	let emailtext = e.target.value
	return email
}

function submit() {
	
	postData(API_URL+'login', email)
		.then(data => console.log(data))
		.catch(err => console.log(err))
	
}


function postData(url, data) {
	
	return fetch(url, {
		body : JSON.stringify(data),
		credentials : 'include',
		method : 'POST',
		mode : 'cors',
		headers : {
			'content-type' : 'application/json'
		}
		
	})
	.then(response => response.json)
	.catch(err => console.log('Error:', err))
	
}

document.getElementById('login').innerHTML = render()