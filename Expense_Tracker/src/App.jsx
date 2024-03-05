import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import './App.css'
import Signup from './pages/auth/Signup'
import Tracker from './pages/expense-tracker/Tracker'

function App() {
 

  return (
    
      <div >
        
        <Router>
          <Routes>
            <Route path='/' exact element={<Signup/>}/>
            <Route path='/tracker' element={<Tracker/>}/>
          </Routes>
        </Router>
       </div>
    
  )
}

export default App
