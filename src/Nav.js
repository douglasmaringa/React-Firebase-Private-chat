import React,{useState,useEffect} from 'react'
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import firebase from "firebase"
import {db,auth} from "./firebase";
import {useHistory} from 'react-router-dom'
import "./nav.css"
function Nav() {
    const[email,setEmail]=useState("")
    const history = useHistory()
    useEffect(() => {
        // will only run once when the app component loads...
    
        auth.onAuthStateChanged((authUser) => {
          console.log("THE USER IS >>> ", authUser.uid);
    
          if (authUser) {
            setEmail(authUser.email)
            // the user just logged in / the user was logged in
         
                
          } else {
            // the user is logged out
           console.log("n")
          }
        });
      }, []);
    
    const handleAuthenticaton = () => {
        if (email) {
          auth.signOut();
        }
        history.push("/login")
      }
    
    return (
        <div className="nav">
            <ul>
  <li onClick={()=>{history.push("/")}}><a >Home</a></li>
  <li><a href="">Hello {email}</a></li>
  <li onClick={handleAuthenticaton}><a >Sign out</a></li>
  
</ul>
        </div>
    )
}

export default Nav
