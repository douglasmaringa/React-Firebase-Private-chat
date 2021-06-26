import React,{useState} from 'react'
import { auth } from "./firebase";
import {useHistory} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import "./bsSignup.css"



function BsLogin() {
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const[load,setLoad]= useState(false)
 
    const history = useHistory()
   

    
    const submit = e => {
      setLoad(true)
        e.preventDefault();
        
        auth
            .signInWithEmailAndPassword(email, pass)
            .then(auth => {
              
               history.push('/')
                setLoad(true)
            })
            .catch(error => alert(error.message))
            setLoad(false)
    }



    return (
        <Paper elevation={3} className="paper1">
        <div className="paperdiv">
        <h1>Sign in</h1>
     
      <Input placeholder="Organisation Email" inputProps={{ 'aria-label': 'description' }} value={email} 
      onChange={(e)=>{setEmail(e.target.value);}}/>
      <br/>
      <Input type="password" placeholder="Organisation Password" inputProps={{ 'aria-label': 'description' }} value={pass}
      onChange={(e)=>{setPass(e.target.value);}}/>
      <br/>
      <Button variant="contained" color="primary" onClick={submit}>
        {
          load?(<>loading...</>):(<> Sign in</>)
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

export default BsLogin
