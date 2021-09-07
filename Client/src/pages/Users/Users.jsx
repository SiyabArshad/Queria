import { AuthContext } from '../../context/context';
import { logout} from "../../context/action.js";
import SystemUpdateIcon from '@material-ui/icons/SystemUpdate';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './user.css'
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { useContext,useEffect,useState} from 'react';
import axios from 'axios'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
export default function Users() {
  const{dispatch}=useContext(AuthContext)
  const classes = useStyles();
  const[users,setusers]=useState([])
  const[error,seterror]=useState(false)
  useEffect(()=>{
    fetchusers()
  },[])
  const fetchusers=async()=>{
    const res=await axios.get('users', {
      headers: {
        token:
          "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    setusers(res.data)
  }
  const deleteuser=async(id)=>{
    try{
      seterror(false)
    const res=await axios.delete(`/deleteuser/${id}`, {
      headers: {
        token:
          "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
      },
    })
    dispatch(logout())
  }
    catch(err){
      seterror(true)
      console.log(err)
    }
  }
  return (
      <div className="users">
<Link className="link"  to='/Admin'><ArrowBackIcon className="back"></ArrowBackIcon>
  </Link>  <TableContainer component={Paper}>
 { error&&<span style={{backgroundColor:"red",color:"#fff"}}>Delete your own Account</span>}
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Update</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          users.map((val)=>(
            <TableRow key={val._id}>
            <TableCell>{val.username}</TableCell>
            <TableCell align="right">{val.email}</TableCell>
            <TableCell align="right"><Link className="link"  to={`/Updateuser/${val._id}`}><SystemUpdateIcon color={"primary"}></SystemUpdateIcon></Link></TableCell>
            <TableCell align="right"><DeleteIcon color={"secondary"} onClick={()=>deleteuser(val._id)}></DeleteIcon></TableCell>
          </TableRow>
          ))
        }
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}
