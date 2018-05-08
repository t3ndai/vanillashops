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
  notes : '',
  total : 0,
  status : {
    ready : false, 
    picked_up : false,
    pending : true,
  }
  
}

//Views 

function renderReceipt(customer, date) {
  return `
  
    <article class='article'>
  
     <!--<button class='table-btn right-btn'> go back to dashboard </button>-->
  
      <p class='article-text'> create new customer receipt </p>
  
      <table class='table'>
  
        <thead>
            <th> &nbsp; </th>
            <th> &nbsp; </th>
  
        </thead>
  
        <tr>
          <td> &nbsp; </td>
          <th> ${date} </th>
    
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
          
          <td contenteditable='true' oninput='item1Input(event)' class='item-cell'> item 1 </td>
          <td contenteditable='true' oninput='price1Input(event)' > price 1 </td>
  
        </tr>
        
        <tr>
          
          <td contenteditable='true' oninput='item2Input(event)'class='item-cell'> item 2 </td>
          <td contenteditable='true' oninput='price2Input(event)'> price 2 </td>
  
        </tr>
        
        <tr>
          
          <td contenteditable='true' oninput='item3Input(event)'class='item-cell'> item 3 </td>
          <td contenteditable='true' oninput='price3Input(event)'> price 3 </td>
  
        </tr>
        
        <tr>
      
          <th rowspan='2'> Total </th>
          <td rowspan='2' class='text-right article-text'> <output name='total' id='total'> $XX </output> </td>
  
        </tr>
  
        <tr>
          <tr> <td> * Any special notes </td></tr>
          <tr>
            <td rowspan='2' contenteditable='true' oninput='notesInput(event)' class='item-cell'> Special notes/comments here </td>
          </tr>
        
        </tr>
        
      </table>
  
      <button onclick='submit()' class='btn pointer'> SUBMIT </button>
  
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
export const notesInput = (e) => receipt.notes = e.target.innerText

export const receiptTotal = () => {
  
 let sum = document.getElementById('total')
  
  sum.value = (Number.parseFloat(receipt.details.item_1.price) 
  +  Number.parseFloat(receipt.details.item_2.price)
  +  Number.parseFloat(receipt.details.item_3.price)).toFixed(2)
  
  receipt.total = Number.parseFloat((Number.parseFloat(sum.value)).toFixed(2))
  
}


export async function submit() {
  
  console.log(receipt)
  
  try {
    let response = await postData(API_URL+'receipts', receipt)
    
    if (response.message) {
      sessionStorage.removeItem('customer')
      navigate('../views/dash.html')
    }
    
  }catch(err) {
    console.log(err)
    if (err instanceof AuthorizationError) {
      alert('Expired session')
    }else if (err instanceof InputError) {
      alert('Wrong input data')
    }
  }
  
}


export function populateReceipt() {
  
  let customer = JSON.parse(sessionStorage.getItem('customer'))
  receipt.customer = customer
  
  let date = (new Date).toDateString()
  receipt.date = date
  
  let article = document.getElementById('new-receipt')
  article.innerHTML = renderReceipt(customer, date)

}