'use strict'

//Imports 
import { API_URL } from './config.js'
import { getData } from './utils.js'
import { renderCustomers } from './customers.js'
import { renderReceipts } from './receipts.js'

//Models



//Views

export function addToPage() {
  
  document.getElementById('customers').innerHTML = renderCustomers()
  document.getElementById('receipts').innerHTML = renderReceipts()
  
}



//Actions 

