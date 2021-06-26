import React, { useState,useEffect} from "react";
import "./home.css";
import firebase from "firebase"
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import {db,auth} from "./firebase";
import {TextField,Button} from "@material-ui/core"
import { useStateValue } from "./StateProvider";
import {useHistory} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    //marginLeft:500,
  },
  media: {
    height: 300,
  },
  root2: {
    maxWidth: "60vw",
    height:"300px",
    padding:10,
    display:"grid",
    gridTemplateColumns:"1fr 1fr",
    marginTop:"20px"
  },
});

function Home(){
  const classes = useStyles();
    //redux
    const [{ single },dispatch] = useStateValue();
const history = useHistory()

//profile state
const[me,setMe]=useState([])
const[users,setUsers]=useState([])
const[email,setEmail]=useState("")

 useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser.uid);

      if (authUser) {
        setEmail(authUser.email)
        // the user just logged in / the user was logged in
        db.collection("users").where("id", "==",authUser.uid)
        .onSnapshot((querySnapshot) => {
           
         setMe(querySnapshot.docs.map((doc)=>doc.data()))
         console.log(querySnapshot.docs.map((doc)=>doc.data()))
           
    })

    db.collection("users").onSnapshot((querySnapshot) => {
           
         setUsers(querySnapshot.docs.map((doc)=>doc.data()))
         console.log(querySnapshot.docs.map((doc)=>doc.data()))
           
    })
            
      } else {
        // the user is logged out
       console.log("n")
      }
    });
  }, []);

  const newScreen = (id) => {
    dispatch({
        type: 'Set_Single',
        item : id
    })
   
    history.push('/chat')
  };

  
  return (
    <div className="home">
     {
       email?(<>
       <div className="left">
      <h1>Marco's Messenger app</h1>
      {
        
        me.map(m=>(
          <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={m.image}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {m.name}
              </Typography>
             
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
        ))
      }
      </div>
      <div className="right">
      <h1>Users</h1>
      {
        users.map(m=>(
          <Card className={classes.root2}>
          
          <CardActionArea>
            
            <CardMedia
              className={classes.media}
              image={m.image}
              title="Contemplative Reptile"
            />
           
          </CardActionArea>
          <CardActionArea>
          <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {m.name}
              </Typography>
              {(() => {
        if (email==m.email) {
          return (
            <Button size="small" color="primary">
              YOU
            </Button>
          )
           } else {
          return (
            <Button size="small" color="primary" onClick={()=>{newScreen(m.id)}}>
              CHAT
            </Button>
          )
        }
      })()}
              
            </CardContent>
            </CardActionArea>
        </Card>
        ))
      }
      </div>
    
       
       </>):(<>Login first <Link to="login">Login</Link><br/>Signup first <Link to="register">Signup</Link></>)
     } 
      
     </div>
  );
}

export default Home;