import React from 'react'
import Home from './components/Home'
import Insight from './components/Insight'
import { BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css'


const App=()=>{
  return (
    <>
      <BrowserRouter>       
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/insights' element={<Insight />}></Route>
        </Routes>
      </BrowserRouter> 
    </>           
  )
}

export default App;