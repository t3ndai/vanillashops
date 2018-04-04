'use strict'

//Imports

//Actions 

export async function postData(url, data) {
		
	console.log(JSON.stringify(data)) 
	
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