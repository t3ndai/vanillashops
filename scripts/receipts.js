'use strict'

//Imports 
import { API_URL } from './config.js'
import { getData, renderCell } from './utils.js'
import { AuthorizationError } from './errors.js'

//Models 
export let receipts = []


//Views 

export function renderReceipts() {
  return `
    <article>
      <table id='receipts-table'>
  
        <caption> Receipts </caption>
  
        <thead>
          <tr>
            <th>  # Number </th>
            <th>  Date </th>
            <th> Customer Name </th>
            <th> Amount </th>
            <th> Status </th>
          </tr>  
        </thead>
  
  
      </table>
    </article>
  `
}

function renderReceipt(receipt) {
  return `
    <tr>
  
      <td> ${renderCell(receipt.receipt._id)} </td>
      <td> ${renderCell(receipt.receipt.date)} </td>
      <td> ${renderCell(receipt.receipt.customer.name)} </td>
      <td> ${renderCell(receipt.receipt.total)} </td>
      <td> ${renderCell(receipt.receipt.status)} </td>
  
    </tr>
  
  `
  
}

export function populateReceiptsTable(receipts) {
  
  let table = document.getElementById('receipts-table')
  
  receipts.map(receipt => {
    
    let row = table.insertRow()
    row.innerHTML = renderReceipt(receipt)
    
  })
  
}


//Actions

export async function getReceipts() {
  
  try {
    
    let receiptsData = await getData(API_URL+'receipts')
    
    populateReceiptsTable(receiptsData)
    
  } catch (err) {
     
    if (err instanceof AuthorizationError ) {
      location.replace('/')
    }
    
    console.log(err)
  }
}

