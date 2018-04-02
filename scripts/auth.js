'use strict'

//Imports
import { postData, navigate } from './utils.js'
import { API_URL } from './config.js'


//Model 
export let token = {'token' : ''}


//View

const render = () => {
	return `
				<article> 
	
					<input type='text' placeholder='token' name='token' oninput='tokenInput(event)'>
					<button onclick='submit()'> Submit </button>
				</article>
	
			`
}


// Actions 

export const tokenInput = (e) => {
	
	return token = Object.assign({}, {'token': e.target.value})
}


export const submit = () => {
	
	const body = token 
	
	postData(API_URL+'auth', body)
		.then(data => {
			console.log(data)
			navigate('../views/dash.html')
		})
		.catch(err => console.log(err))
	
	/*try {
		let response = postData(API_URL+'auth', body)
		
		if (response.ok) {
			navigate('../views/dash.html')
		}
			
	}catch(err) {
		console.log(err)
	}*/
	
}

export function addToPage() {
	document.getElementById('auth').innerHTML = render()
}




