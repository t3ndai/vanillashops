'use strict'
//Imports 
import { API_URL } from './config.js'
import { getData } from './utils.js'

//Models 
export let customers = []


//Views 

export const renderCustomers = () => {
	return `
	
		   		<article>
	
					<table id='customers-table'>
	
						<tr>
	
							<th> Customer Name </th>
							<th> Customer Email </th>
							<th> Customer Phone </th>
              <th> Customer Address </th>
	
						</tr>
	
					</table>
	
				
				</article>
	
	
			`
} 


function renderCustomer(customer) {
  console.log(customer)
  return `
  
    <tr>
  
      <td> ${customer.name} </td>
      <td> ${customer.email} </td>
      <td> ${customer.phone} </td>
      <td> ${customer.address} </td>
  
    <tr>
  
  `
}

export function populateCustomersTable(customers) {
  
  //this will be cleaner 
  //but not getting array from getCustomers()  
  
  customers
      .map((customer) => {
        let row = document.createElement('td')
        row.innerHTML = renderCustomer(customer)
        document.getElementById('customers-table').appendChild(row)
      })
      
}


//Actions 

export async function getCustomers() {
  
  try {
     let customersData = await getData(API_URL+'customers')
    
      populateCustomersTable(customersData)
      
  }catch(err) {
    console.log(err)
  }
}


