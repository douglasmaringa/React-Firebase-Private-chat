import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import "./App.css"
import { auth ,db} from "./firebase";
import BsLogin from "./BsLogin"
import Home from "./Home"
import Register from "./Register"
import Profile from "./Profile"
import Nav from "./Nav"
import {useHistory} from 'react-router-dom';
import Chat from "./Chat"
function App() {
  
  return (
    <Router>
      <Switch>
      <Route path="/chat">
      <Nav/>
       <Chat/>
          </Route>
      <Route path="/profile">
       <Profile/>
          </Route>
      <Route path="/register">
       <Register/>
          </Route>
      <Route path="/login">
      <Nav/>
       <BsLogin/>
          </Route>
     <Route path="/">
       <Nav/>
     <Home />
     </Route>
        </Switch>
    </Router>
  )
}

export default App
