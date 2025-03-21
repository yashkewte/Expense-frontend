import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Home from './pages/Dashboard/Home'
import Expense from './pages/Dashboard/Expense'
import Income from './pages/Dashboard/Income'
import UserProvider from "./context/userContext"
import {Toaster} from 'react-hot-toast'


function App() {


  return (
    <UserProvider>
      <div>
       <Router>
          <Routes>
            <Route path="/" element = {<Root />} />
            <Route path="/login" exact element = {<Login />} />
            <Route path="/signup" exact element = {<Signup />} />
            <Route path="/dashboard" exact element = {<Home />} />
            <Route path="/expense" exact element = {<Expense />} />
            <Route path="/income" exact element = {<Income />} />
          </Routes>
       </Router>
      </div> 

      <Toaster
        position="bottom-right"
        reverseOrder={false}
        toastOptions={{
          className:'',
          style:{
            fontSize: '18px',
            backgroundColor: "#3E3F5B",
            color:"white"
          }
        }}
        
      />
    </UserProvider>
  )
}

export default App


const Root = () => {
  // check if the token is present in the local storage
  const isAuthenicated = !!localStorage.getItem("token")

  //redirect to dashboard if the token is present, otherwise redirect to login page
  return isAuthenicated ? (<Navigate to="/dashboard"/>) : (<Navigate to="/login"/>)
}