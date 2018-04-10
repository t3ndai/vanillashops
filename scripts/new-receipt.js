'use strict'

//Imports 
import { API_URL } from './config.js'
import { postData, navigate } from './utils.js'
import { AuthorizationError, InputError } from './errors.js'

//Models 

export let receipt = {
  shop : {
    name : 'dzonga shop',
    address : '2 lane way, pa 1944',
    phone : '813 335 9871',
    email : 'ptdzonga@gmail.com'
  },
  customer : { },
  date : '',
  details : {
    item_1 : {
      detail : '',
      price : 0,
    },
    item_2 : {
      detail : '',
      price : 0,
    },
    item_3 : {
      detail : '',
      price : 0,
    },
  },
  special_notes : '',
  total : 0,
  status : {
    ready : false, 
    picked_up : false,
    pending : true,
  }
  
}

//Views 

function renderReceipt(customer) {
  return `
  
    <article>
  
      <table>
  
        <colgroup span='4'>
      
            <col span='3'>
            <col span='1'>
        </colgroup>
  
        <tr>
          <td> &nbsp; </td>
          <th> 04/09/18 </th>
    
        <tr>
  
        <tr rowspan='5'>
          
          <tr> <td> Dzonga Shop </td></tr>
          <tr> <td> ptdzonga@gmail.com </td></tr>
          <tr> <td> 813 335 9871 </td></tr>
  
        </tr>
  
        <tr rowspan='3'>
  
          <tr> 
            <td> &nbsp; </td> 
            <td> ${customer.name} </td>
          </tr>
          <tr> 
            <td> &nbsp; </td>
            <td> ${customer.email} </td>
          </tr>
          <tr> 
            <td> &nbsp; </td>
            <td> ${customer.phone} </td>
          </tr>
  
        </tr>
  
        <tr colspan='4'>
  
          <th> Details </th>
  
        </tr>
  
        <tr>
          
          <td contenteditable='true' oninput='item1Input(event)'> item 1 </td>
          <td contenteditable='true' oninput='price1Input(event)'> price 1 </td>
  
        </tr>
        
        <tr>
          
          <td contenteditable='true' oninput='item2Input(event)'> item 2 </td>
          <td contenteditable='true' oninput='price2Input(event)'> price 2 </td>
  
        </tr>
        
        <tr>
          
          <td contenteditable='true' oninput='item3Input(event)'> item 3 </td>
          <td contenteditable='true' oninput='price3Input(event)'> price 3 </td>
  
        </tr>
        
        <tr>
      
          <th rowspan='2'> Total </th>
          <th rowspan='2'> <output name='total' id='total'> XX </output> </th>
  
        </tr>
  
        <tr>
          <tr> <td> * Any special notes </td></tr>
          <tr>
            <td rowspan='2' contenteditable='true'> Special notes/comments here </td>
          </tr>
        
        </tr>
        
      </table>
  
      <button onclick='submit()'> SUBMIT </button>
  
    </article>
  
  `
}



//Actions 

export const item1Input = (e) => receipt.details.item_1.detail = e.target.innerText
export const price1Input = (e) => { 
  receipt.details.item_1.price = e.target.innerText 
  receiptTotal() 
}
export const item2Input = (e) =>  receipt.details.item_2.detail = e.target.innerText
export const price2Input = (e) =>  {
  receipt.details.item_2.price = e.target.innerText
  receiptTotal()
}
export const item3Input = (e) => receipt.details.item_3.detail = e.target.innerText
export const price3Input = (e) => {
   receipt.details.item_3.price = e.target.innerText
   receiptTotal() 
}
//export const item1Input = (e) => receipt.details.item_1.detail = e.target.innerText

export const receiptTotal = () => {
  
 let sum = document.getElementById('total')
  
 sum.value = Number.parseInt(receipt.details.item_1.price) + Number.parseInt(receipt.details.item_2.price) 
          + Number.parseInt(receipt.details.item_3.price)
  
  receipt.total = Number.parseInt(sum.value)
  
}


export function submit() {
  
  console.log(receipt)
}


export function populateReceipt() {
  
  let customer = JSON.parse(sessionStorage.getItem('customer'))
  receipt.customer = customer
  
  let article = document.getElementById('new-receipt')
  article.innerHTML = renderReceipt(customer)

}