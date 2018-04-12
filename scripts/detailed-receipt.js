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
        
      </table>
  
    </article>
  `
}


//Actions 

export function populateReceipt() {
  
  let receipt = JSON.parse(sessionStorage.getItem('receipt'))
  let details = JSON.parse(receipt.details)
  
  console.log(details)
  
  let article = document.getElementById('detailed-receipt')
  
  article.innerHTML = renderReceipt(receipt, details)
}


