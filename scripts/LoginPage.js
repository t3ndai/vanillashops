'use strict'
//import axios from 'axios'

// Model 

let email = ''



// View 

function render() {
	return 
		`
			<article>
				<input type="email" name="email"  id="email" placeholder="email"  oninput="">
				
				<button> Register/Login </button>
				
			</article>
		`
	
}

// Update | Actions 

function emailInput() {
	return 
}

function submit() {
	
	
	
}

document.getElementById('login').innerHTML = render