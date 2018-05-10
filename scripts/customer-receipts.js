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
    <article class='article-bordered'>
  
      <!--<button onclick='backToDash()'> Go Back To Dashboard </button>-->
  
      <table id='customer-receipts-table' class='table'>
  
        <caption class='article-text'> ${customer.name}'s Purchase History </caption>
  
        <tr>
  
          <th> # Number </th>
          <th> Date </th>
          <th> $ Amount </th>
          <th> Items </th>
  
        </tr>
  
      </table>
    
    </article>
  
  `
}

function renderReceipt(receipt) {
  console.log(receipt)
  return `
      <tr> 
        <td> ${receipt.receipt_id } </td>
        <td> ${receipt.date_created } </td>
        <td> ${receipt.total} </td>
        <td> 
            <ul>
                <li> ${ parseReceiptDetails(receipt.details).item_1.detail } </li>
                <li> ${ parseReceiptDetails(receipt.details).item_2.detail } </li>
                <li> ${ parseReceiptDetails(receipt.details).item_3.detail } </li>
            </ul>
        </td>
      </tr>
  `
} 

//Actions 

export function backToDash() {
  
  navigate('./dash.html')
  
}

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

function parseReceiptDetails(receipt) {
  
  let details = JSON.parse(receipt)  
  return details
  
}

async function getCustomerReceipts(customer) {
  
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