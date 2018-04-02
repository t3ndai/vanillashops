'use strict'

//Imports 
import { API_URL } from './config.js'
import { getData } from './utils.js'
import { renderCustomers, getCustomers } from './customers.js'

//Models



//Views

export function addToPage() {
  
  document.getElementById('customers').innerHTML = renderCustomers()
  
}



//Actions 

