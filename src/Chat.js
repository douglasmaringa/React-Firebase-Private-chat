import React,{useState,useEffect} from 'react'
import "./chat.css"
import firebase from "firebase"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import {db,auth} from "./firebase";
import {TextField,Button} from "@material-ui/core"
import { useStateValue } from "./StateProvider";
import {useHistory} from 'react-router-dom'
import Message from "./Message"

function Chat() {
     //redux
     const [{ single },dispatch] = useStateValue();
     const history = useHistory()

     //chat state
     const[input,setInput] = useState("")
  const [messages,setMessages]= useState([ { username:"",text:""},
  {username:"",text:""}])
  const [username, setUsername]=useState("")

  //set message id
  const[msgid,setMsgid]=useState("")

  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser.uid);

      if (authUser) {
        // the user just logged in / the user was logged in
        setUsername(authUser.email)
        if(single <authUser.uid){
           setMsgid(single+authUser.uid);  
           db.collection(single+authUser.uid).orderBy('timestamp','desc').onSnapshot(snapshot=>{
            setMessages(snapshot.docs.map(doc=>doc.data()))
          })
            }
            else{
                console.log(authUser.uid+single);
                setMsgid(authUser.uid+single); 
                db.collection(authUser.uid+single).orderBy('timestamp','desc').onSnapshot(snapshot=>{
                    setMessages(snapshot.docs.map(doc=>doc.data()))
                  })
            }
            
      } else {
        // the user is logged out
       console.log("n")
      }
    });
  }, []);

  
  
  const sendMessage = (event)=>{
    event.preventDefault()
    if(msgid){
        db.collection(msgid).add({
            message:input,
            username:username,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
            
          })
    }
    setInput('');
  }

     console.log(single)
    return (
        <div className="App">
      <h1>Marco's Messenger app</h1>
      <form >
    
    <TextField value={input} onChange={event=>setInput(event.target.value)} id="standard-basic" label="Standard" />
     
     <Button type="submit" onClick={sendMessage} variant="contained" color="primary">
  Send
</Button>
     </form>
     <ul >
       {messages.map(message=>(
      <h2> <Message username={username} message={message}/></h2>
       ))}
     </ul>
     
     </div>
    )
}

export default Chat
