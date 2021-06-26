import React,{useState,useEffect} from 'react'
import { auth,db } from "./firebase";
import firebase from "firebase"
import {useHistory} from 'react-router-dom';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';


import "./bsSignup.css"



function Profile() {
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");
  const [name, setName] = React.useState("");
  const [image, setImage] = React.useState("");
  const[load,setLoad]= useState(false)
 
    const history = useHistory()
   
    useEffect(() => {
        // will only run once when the app component loads...
    
        auth.onAuthStateChanged((authUser) => {
          //console.log("THE USER IS >>> ", authUser.uid);
    
          if (authUser) {
            // the user just logged in / the user was logged in
           setEmail(authUser.email)
           setId(authUser.uid)
          } else {
            // the user is logged out
           console.log("n")
          }
        });
      }, []);
    
      //console.log(email,id)
    const submit = e => {
      setLoad(true)
        e.preventDefault();
        
        db.collection("users").add({
            name:name,
            email:email,
            id:id,
            image:image,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
            
        })
        history.push("/")
}
    



    return (
        <Paper elevation={3} className="paper1">
        <div className="paperdiv">
        <h1>Profile info</h1>
     
      <Input placeholder="Name" inputProps={{ 'aria-label': 'description' }} value={name} 
      onChange={(e)=>{setName(e.target.value);}}/>
      <br/>
      <Input  placeholder="Image" inputProps={{ 'aria-label': 'description' }} value={image}
      onChange={(e)=>{setImage(e.target.value);}}/>
      <br/>
      <Button variant="contained" color="primary" onClick={submit}>
        {
          load?(<>loading...</>):(<> Save</>)
        }
       
      </Button>
      <br/>
      
        </div>
        </Paper>
    )
}

export default Profile
