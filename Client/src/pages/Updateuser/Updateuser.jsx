import { logout} from "../../context/action.js";
import axios from 'axios'
import React,{useState,useContext} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link,useLocation } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {AuthContext} from '../../context/context'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Updateuser() {
  const classes = useStyles();
 const{user,dispatch}=useContext(AuthContext)
  const location=useLocation()
  const id=location.pathname.split('/')[2]
   const [username,setusername]=useState(user.username)
   const [password,setpassword]=useState(user.password)
   const[email,setemail]=useState(user.email)
   const[er,seter]=useState(false)
   const HandlUpdate=async(e)=>{
     e.preventDefault()
     try{
       seter(false)
       const res=await axios.put(`/updateuser/${id}`,{username,email,password} ,{
        headers: {
          token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      dispatch(logout())
     }
     catch(err)
     {
       seter(true)
       console.log(err)
     }
   }
  
  return (
    <Container component="main" maxWidth="xs">
      { er&&<span style={{backgroundColor:"red",color:"#fff"}}>Update your own Account</span>}
      <Link className="link" to='/Admin'><ArrowBackIcon style={{margin:"2rem"}}></ArrowBackIcon></Link>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Your Information
        </Typography>
        <form onSubmit={HandlUpdate} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="username"
                variant="outlined"
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
               value={username}
                onChange={(e)=>setusername(e.target.value)}                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(e)=>setemail(e.target.value)}

              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                onChange={(e)=>setpassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Update
          </Button>
        </form>
      </div>
   </Container>
  );
}