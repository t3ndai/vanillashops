'use strict'

//Imports 
import { API_URL } from './config.js'
import { AuthorizationError } from './errors.js'

//Models 
let receipt = {}

//Views 

function renderReceipt(receipt, details) {
  return `
  
    <article>
  
      <table>
  
        <colgroup span='4'>
      
            <col span='3'>
            <col span='1'>
        </colgroup>
  
        <tr>
          <td> &nbsp; </td>
          <th> ${receipt.date_created} </th>
    
        <tr>
  
        <tr rowspan='5'>
          
          <tr> <td> Dzonga Shop </td></tr>
          <tr> <td> ptdzonga@gmail.com </td></tr>
          <tr> <td> 813 335 9871 </td></tr>
  
        </tr>
  
        <tr rowspan='3'>
  
          <tr> 
            <td> &nbsp; </td> 
            <td> ${details.customer.name} </td>
          </tr>
          <tr> 
            <td> &nbsp; </td>
            <td> ${details.customer.email} </td>
          </tr>
          <tr> 
            <td> &nbsp; </td>
            <td> ${details.customer.phone} </td>
          </tr>
  
        </tr>
  
        <tr colspan='4'>
  
          <th> Details </th>
  
        </tr>
  
        <tr>
          
          <td> ${details.details.item_1.detail } </td>
          <td> ${details.details.item_1.price } </td>
  
        </tr>
        
        <tr>
          
          <td> ${details.details.item_2.detail } </td>
          <td> ${details.details.item_2.price } </td>
  
        </tr>
        
        <tr>
          
          <td>  ${details.details.item_3.detail } </td>
          <td> ${details.details.item_3.price } </td>
  
        </tr>
        
        <tr>
      
          <th rowspan='2'> Total </th>
          <th rowspan='2'>  ${ receipt.total }   </th>
  
        </tr>
  
        <tr>
          <tr> <td> special notes </td></tr>
          <tr>
            <td rowspan='2'> ${details.notes} </td>
          </tr>
        
        </tr>
  
        <tr>
          <tr>
            <td> Status  </td>
            <td style="${renderStatus(details.status)}"> Pending </td> 
          </tr>
  
        </tr>
        
      </table>
  
    </article>
  `
  //
}

function viewStatusChange() {
  return `
     
    <article>
  
        <p> Change Status </p>
  
        <label> new status </label> 
  
        <select onchange='changeStatus(event)'>
    
          <option value='Ready'> Ready </option>
  
          <option value='Picked_Up'> Picked Up </option>
  
          <option value='Pending' selected> Pending </option>
  
        </select>
  
    </article>
  
  `
}

//Actions 

export function changeStatus(e) {
  
  let new_status = e.target.value
  let details = JSON.parse(receipt.details)
  console.log('change', e.target.value)
  console.log(details)
  
  switch(new_status) {
    case 'Ready':
      details.status = { 'ready' : true }
      populateReceipt(receipt, details)
      break
      
    case 'Picked_Up':
      details.status = { 'picked_up' : true }
      populateReceipt(receipt, details)
      break
      
    case 'Pending': 
      details.status = { 'pending' : true }
      populateReceipt(receipt, details)
      break
  }
  
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


export function getReceipt() {
  
  receipt = JSON.parse(sessionStorage.getItem('receipt'))
  let details = JSON.parse(receipt.details)
  
  populateReceipt(receipt, details)
  
}

export function populateReceipt(receipt, details) {
  
  
  let article = document.getElementById('detailed-receipt')

  article.innerHTML = renderReceipt(receipt, details)
  
  
}

export function populateStatusChange() {
  
  let article = document.getElementById('new-status')
  
  article.innerHTML = viewStatusChange()
  
}


