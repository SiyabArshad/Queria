import React,{useState,useEffect} from 'react'
import './single.css'
import { Link,useLocation } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import axios from 'axios'
const Single = () => {
    const location =useLocation()
    const id=location.pathname.split('/')[2]
    const[post,setpost]=useState({})
    const fetchpost=async()=>{
        try{
            const res=await axios.get(`/post/${id}`)
            setpost(res.data)
        }
        catch(err)
        {
            console.log(err)
        }
    }
    useEffect(()=>{
        fetchpost()
    },[id])
    const PF = "http://localhost:5000/images/";
    return (
        <div className="mainsingle" >
       <Link className="link"  to='/'> <ArrowBackIcon className="back"></ArrowBackIcon></Link>
        <h4 className="title">{post.title}</h4>
            <div className="imgcont">
                <img src={PF + post.img}alt={post.title}></img>
            </div>
                <p className="desc">{post.desc}</p>
        </div>
    )
}

export default Single
