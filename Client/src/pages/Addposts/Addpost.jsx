import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import React,{useState} from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link,useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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

export default function Addpost() {
  const classes = useStyles();
  const history=useHistory()
  const[file,setfile]=useState('')
  const[title,settitle]=useState('')
  const[desc,setdesc]=useState('')
  const[er,seter]=useState(false)
  const handlepost=async(e)=>{
    e.preventDefault()
try{
  const data =new FormData();
  data.append("image", file);
 data.append("title",title)
 data.append("desc",desc)
  const res=await axios.post('addpost',data,{
    headers: {
      token:
        "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
    },})
  seter(false)
  history.push('/posts')
}
catch(err)
{
  seter(true)
  console.log(err)
}
  }
  return (
    <Container component="main" maxWidth="xs">
   {er&&<span style={{backgroundColor:"red" ,color:"#fff"}}>Something went wrong!</span>}
   <Link className="link"  to='/Admin'>  <ArrowBackIcon style={{margin:"2rem"}}></ArrowBackIcon>
    </Link>  <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create new Post
        </Typography>
        <form onSubmit={handlepost} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="title"
                name="title"
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                onChange={(e)=>settitle(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="desc"
                label="desc"
                name="desc"
                autoComplete="desc"
                onChange={(e)=>setdesc(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <OutlinedInput type="file" onChange={(e) => setfile(e.target.files[0])} name="image"></OutlinedInput>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Add post
          </Button>
        </form>
      </div>
    </Container>
  );
}