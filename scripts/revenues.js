'use strict'
//Imports 
import { getData } from './utils.js'
import { AuthorizationError } from './errors.js'
import { API_URL } from './config.js'

//Models
let revenue = 0

//Views 

export function renderRevenue() {
  return `
    <article>
  
      <h1 class='article-text text-center'> Today's Revenue is </h1>
      <h2 class='text-center main-text' id='revenue-text'>  $0 </h2>
  
  
    </article>
   
  `
  
  //
} 

//Actions 

function revenueAmount( revenue ) {
  
  document.getElementById('revenue-text').innerText = `$${Number.parseFloat(revenue.revenue).toFixed(2)}`
  
  
}

export async function getRevenue() {
  
  try {
    
    revenue = await getData(API_URL+'revenue')
    
    revenueAmount(revenue)
  
  }catch(err) {
    
    if (err instanceof AuthorizationError ) {
      location.replace('/')
    }
    //console.log(err)
  }
}