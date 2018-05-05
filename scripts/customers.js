'use strict'
//Imports 
import { API_URL } from './config.js'
import { getData, renderCell, navigate } from './utils.js'
import { AuthorizationError, InputError } from './errors.js'

//Models 
export let customers = []


//Views 

export const renderCustomers = () => {
	return `
      
          <article class='article'>
    
            <button class='right-btn table-btn pointer' id-'add-customer' onclick='addCustomer()'>Add Customer</button>
	
  					<table id='customers-table' class = 'table highlight'>
  
              <caption class='article-text'> Customers </caption>
	
              <thead>
    						<tr>
	              
                
    							<th> Customer Name </th>
    							<th> Customer Email </th>
    							<th> Customer Phone </th>
                  <th> Customer Address </th>
	
    						</tr>
              </thead>	
  
              <tbody></tbody>
  					</table>
  
        </article>
	
			`
} 


function renderCustomer(customer) {
  //console.log(customer)

  return `
    <tr>
      <td> ${renderCell(customer.name)} </td>
      <td> ${renderCell(customer.email)} </td>
      <td> ${renderCell(customer.phone)} </td>
      <td> ${renderCell(customer.address)} </td>
      <button id='addReceiptBTN' class='table-btn pointer'> + new receipt </button>
      <button id='historyBTN' class='table-btn pointer'> history </button>
    </tr>
  `
  /*let row = document.createElement('tr')
  <td> ${/*Object.values(customer).map(data => renderCell(data)) 
  Object.values(customer).map((data) => {
      
          let cell = renderCell(data)
          row.appendChild(cell)
          
        
      })
      
  return row*/
}




//Actions 

export function populateCustomersTable(customers) {
  
  //this will be cleaner 
  //but not getting array from getCustomers()  
  let tbody = document.createElement('tbody')
  let table = document.getElementById('customers-table')
  //let button = document.getElementById('addReceiptBTN')
  customers
      .map((customer) => { 
        //let row = document.createElement('td')  
        //row.innerHTML = renderCustomer(customer)        
        let row = table.insertRow()
        row.innerHTML = renderCustomer(customer)
        //button.onclick = () => { createCustomerRecipt(event, customer) }
        let addReceiptBtn = row.getElementsByTagName('button')[0]
        addReceiptBtn.onclick = () => { createCustomerReceipt(event, customer) }
        
        let historyBtn = row.getElementsByTagName('button')[1]
        historyBtn.onclick = () => { customerHistory(event, customer) }

      })
      
}

export function createCustomerReceipt(e, customer) {
  
  sessionStorage.setItem('customer', JSON.stringify(customer))
  console.log(customer)
  navigate('../views/new-receipt.html')
  
}

export function customerHistory(e, customer) {
  
  sessionStorage.setItem('customer', JSON.stringify(customer))
  console.log(customer)
  navigate('../views/customer-receipts.html')
  
}

export function addCustomer() {
  
  navigate('../views/new-customer.html')
}

export async function getCustomers() {
  
  try {
     let customersData = await getData(API_URL+'customers')
    
      populateCustomersTable(customersData)
      
  }catch(err) {
      
    if (err instanceof AuthorizationError) {
      location.replace('/')
    }
   
    console.log(err)
    
  }
}


