'use strict'

//Imports 
import { API_URL } from './config.js'
import { getData, renderCell, navigate } from './utils.js'
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
      <td style="${renderStatus(receipt.receipt.status)}"></td>
  
    </tr>
  
  `
  
}

function viewReceiptDetails(e, receipt){
  console.log(receipt)
  alert('meh')
}

function renderStatus(status) {
  
  let statusMap = new Map(Object.entries(status))
  
  if (statusMap.get('pending') === true ) {
    return `background-color: #E63946`
  }else if (statusMap.get('ready') === true) {
    return `background-color: #E0CA3C`
  }else if (statusMap.get('picked_up') === true ) {
    return `background-color: #048A81`
  }
}

export function populateReceiptsTable(receipts) {
  
  let table = document.getElementById('receipts-table')
  
  receipts.map(receipt => {
    
    let row = document.createElement('tr')
    row.innerHTML = renderReceipt(receipt)
    row.onclick = () => { viewReceiptDetails(event, receipt) }
    //row.addEventListener('click', viewReceiptDetails)
    table.appendChild(row)
    
  })
  
}


//Actions

export async function getReceipts() {
  
  try {
    
    let receiptsData = await getData(API_URL+'receipts')
    
    populateReceiptsTable(receiptsData)
    
  } catch (err) {
     
    if (err instanceof AuthorizationError ) {
      navigate('/')
      //location.replace('/')
    }
    
    console.log(err)
  }
}

