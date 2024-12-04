import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import CreateAccount from './CreateAccount'
import InventoryHome from './InventoryHome'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/CreateAccount' element={<CreateAccount />}/>
          <Route path='/InventoryHome' element={<InventoryHome />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
