import { logout} from "../../context/action.js";
import React,{useContext} from 'react'
import './side.css'
import GroupIcon from '@material-ui/icons/Group';
import PostAddIcon from '@material-ui/icons/PostAdd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/context';
const Sidebar = () => {
    const {user,dispatch}=useContext(AuthContext)
    return (
        <div className="sidebarmain">
            <h2>Queria</h2>
            <div className="icon">
            <Link className="link" to='/Users'>  <GroupIcon className="csi"></GroupIcon></Link>
            <span>Users</span>
            </div>    
            <div className="icon">
            <Link className="link" to='/posts'><PostAddIcon className="csi"></PostAddIcon></Link>
            <span>Posts</span>
            </div>
            <div className="icon">
            <Link className="link" to='/addposts'> <PostAddIcon className="csi"></PostAddIcon></Link>
            <span>Add content</span>
            </div>
            <div className="icon">
            <ExitToAppIcon onClick={() => dispatch(logout())} className="csi"></ExitToAppIcon>
            <span>Logout</span>
</div>
            <div className="icon">
                <h3>{user.username}</h3>
            </div>
            <div className="btns">
             <Link className="link"  to='/Register'>   <Button  size={"small"} variant={"outlined"} color={"secondary"}>Register</Button>
            </Link>
            </div>
           {!user&&
            <div className="btns">
            <Link className="link"  to='/Login'> <Button  size={"small"} variant={"outlined"} color={"secondary"}>Login</Button>
           </Link>
            </div>
           }
        </div>
    )
}

export default Sidebar
