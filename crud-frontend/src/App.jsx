import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './HomePage'
import CreateAccount from './CreateAccount'
import InventoryHome from './InventoryHome'
import VisitorPage from './VisitorPage'

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}/>
          <Route path='/CreateAccount' element={<CreateAccount />}/>
          <Route path='/InventoryHome' element={<InventoryHome />}/>
          <Route path='/VisitorPage' element={<VisitorPage />}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
