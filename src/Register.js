import React,{useState} from 'react'
import { auth } from "./firebase";
import {useHistory} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import "./bsSignup.css"



function Register() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const[load,setLoad]= useState(false)
 
    const history = useHistory()
   

    
    const submit = e => {
      setLoad(true)
        e.preventDefault();
        
        auth
        .createUserWithEmailAndPassword(email, pass)
        .then((auth) => {
            // it successfully created a new user with email and password
            if (auth) {
                history.push('/profile')
            }
        })
        .catch(error => alert(error.message))
}
    



    return (
        <Paper elevation={3} className="paper1">
        <div className="paperdiv">
        <h1>Sign up</h1>
     
      <Input placeholder="Organisation Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
      <br/>
      <Input type="password" placeholder="Organisation Password" inputProps={{ 'aria-label': 'description' }} value={pass}
      onChange={(e)=>{setPass(e.target.value);}}/>
      <br/>
      <Button variant="contained" color="primary" onClick={submit}>
        {
          load?(<>loading...</>):(<> Sign up</>)
        }
       
      </Button>
      <br/>
      <Button variant="contained" color="secondary" onClick={()=>{history.push("/")}}>
       Cancel
      </Button>
      <br/>
      <Button  color="secondary" onClick={()=>{history.push("/")}}>
       Forgot Password
      </Button>
        </div>
        </Paper>
    )
}

export default Register
