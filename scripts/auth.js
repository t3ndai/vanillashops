'use strict'

//Imports
import { postData, navigate } from './utils.js'
import { API_URL } from './config.js'
import { InputError } from './errors.js'


//Model 
export let token = {'token' : ''}


//View

const render = () => {
	return `
				<article class='article'> 
  
          <p class='article-text'> Input auth code, you received in your email to continue </p>
	
					<input class= 'input' type='text' placeholder='token' name='token' required minlength='5' maxlength='5' oninput='tokenInput(event)'>
					<button class= 'btn pointer' onclick='submit()'> Continue </button>
				</article>
	
			`
}


// Actions 

export const tokenInput = (e) => {
	
	return token = Object.assign({}, {'token': e.target.value})
}


export const submit = async () => {
	
	const body = token 
	
	try {
		let response = await postData(API_URL+'auth', body)
    
    console.log(response)
		
		if (response.message) {
			navigate('../views/new-shop.html')
		}else {
		  navigate('../views/dash.html')
		}
			
	}catch(err) {
		console.log(err)
    if (err instanceof InputError) {
      alert('token expired')
    }
	}
	
}

export function addToPage() {
	document.getElementById('auth').innerHTML = render()
}




