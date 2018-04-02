'use strict'

export async function postData(url, data) {
	
	
	console.log(JSON.stringify(data)) 
	
	let statusCode = 0
	
	/*fetch(url, {
		headers : {
			'Content-Type' : 'application/json',
		},
		body : JSON.stringify(data),
		credentials : 'include',
		method : 'POST',
		mode : 'cors',
		
		
	})
	.then(response =>  {
		//statusCode = response.status
		if (response.ok) {
			return response
		}
		throw Error(response.statusText)
		
	})
	.then(response => response.json())
	.then(response => {
		switch(statusCode) {
			case 400:
				throw Errow('Bad Input')
				break
			case 500:
				throw Error('Server error')
				break
			default:
				throw Error('unhanlded')
				break
		}
	})
	.catch(err => console.log('Error:', err.message))*/
	
	
	
	try {
		
		let response =  await fetch(url, {
				headers : {
					'Content-Type' : 'application/json',
				},
				body : JSON.stringify(data),
				credentials : 'include',
				method : 'POST',
				mode : 'cors',
		
			})
			
			
			return await handleResponse(response)
			
		
	} catch (err) {
		console.log('Error:', err.message)
	}
	
}

export async function getData(url) {
	
	try {
		let response = await fetch(url, {
			'headers' : { 'Content-Type' : 'application/json' },
			'credentials' : 'include',
			'method' : 'GET',
			'mode' : 'cors',
		})
		
		return await handleResponse(response)
	
	} catch(err) {
		console.log('Error:', err.message)
	}
}

async function handleResponse(response) {
	
	if (response.status >= 200 && response.status < 300) {
		return await response.json()
	}else if (response.status == 401) {
		throw Error('Not authorized')
	}else if (response.status == 400) {
		throw Error('Invalid input')
	}else {
		throw Error('Errors encountered')
	}
	
}

export const navigate = (page) => {
	
	location.assign(page)
}