'use strict'

//Imports 
import { API_URL } from './config.js'
import { getData, navigate } from './utils.js'
import { AuthorizationError } from './errors.js'

//Models 
let receipts = []
let customer = {}

//Views 
function renderCustomerReceipts(customer){
  return `
    <article>
  
      <button> Go Back To Dashboard </button>
  
      <table id='customer-receipts-table'>
  
        <caption> ${customer.name} Purchase History </caption>
  
        <tr>
  
          <th> # Number </th>
          <th> Date </th>
          <th> Amount </th>
          <th> Items </th>
  
        </tr>
  
      </table>
    
    </article>
  
  `
}

function renderReceipt(receipt) {
  return `
      <tr> 
        <td> ${receipt.receipt_id } </td>
        <td> ${receipt.date_created } </td>
        <td> ${receipt.total} </td>
        <td> 
            <ul>
                <li> 1 item </li>
                <li> 2 item </li>
                <li> 3 item </li>
            </ul>
        </td>
      </tr>
  `
} 

//Actions 

function getCustomer() {
  
  return customer = JSON.parse(sessionStorage.getItem('customer'))
  
}

function populateCustomerReceiptsTable(receipts) {
  
  let table = document.getElementById('customer-receipts-table')
  
  receipts.map(receipt => {
    
    let row = table.insertRow()
    row.innerHTML = renderReceipt(receipt)
    
  })
  
}

async function getCustomerReceipts(customer) {
  
  console.log(customer)
  
  try {
    
    receipts = await getData(API_URL+`customer_receipts/?customer_id=${customer.customer_id}`)
    populateCustomerReceiptsTable(receipts)
    
  }catch (err) {
    
    if (err instanceof AuthorizationError) {
      location.replace('/')
    }
    console.log(err)
  }
}

export function addToPage(){
  
  document.getElementById('customer-receipts').innerHTML = renderCustomerReceipts(getCustomer())
  getCustomerReceipts(getCustomer())
  
} 