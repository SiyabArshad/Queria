import axios from 'axios'
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './posts.css'
import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function Posts() {
  const classes = useStyles();
  const[posts,setposts]=useState([])
  const[error,seterror]=useState(false)
  const fetchposts=async()=>{
    try{
    const res=await axios.get('posts')
      setposts(res.data)
  }
  catch(err)
  {
    console.log(err)
  }
  }
  useEffect(()=>{
    fetchposts()
    },[]) 
    const deletepost=async(id)=>{
      try{
        seterror(false)
      const res=await axios.delete(`/deletepost/${id}`, {
        headers: {
          token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
    }
      catch(err){
        seterror(true)
        console.log(err)
      }
    }
  return (
      <div className="users">
    <Link className="link"  to='/Admin'><ArrowBackIcon className="back"></ArrowBackIcon>
    { error&&<span style={{backgroundColor:"red",color:"#fff"}}>Deletion failed</span>}
   </Link> <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
       {
         posts.map((p)=>(
          <TableRow key={p._id}>
            <TableCell>{p.title}</TableCell>
            <TableCell align="right">{p.desc.substring(0,20)}</TableCell>
            <TableCell align="right"><Link className="link"  to={`/Updateposts/${p._id}`}><SystemUpdateIcon color={"primary"}></SystemUpdateIcon></Link></TableCell>
            <TableCell align="right"><DeleteIcon color={"secondary"} onClick={()=>deletepost(p._id)}></DeleteIcon></TableCell>
          </TableRow>
         ))
       }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
