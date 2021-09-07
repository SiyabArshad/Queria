import React,{useEffect,useState} from 'react'
import './home.css'
import Nav from '../../components/Navbar/Nav'
import ContentCard from '../../components/Contentcard/Content'
import axios from 'axios'
const Home = () => {
  
  const[posts,setposts]=useState([])
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
  return (
        <>
          <Nav></Nav>  
          <div className="contentdiv"> 
          {
            posts.map((post)=>(<ContentCard post={post} key={post._id}></ContentCard>))
          }
          </div>
        </>
    )
}

export default Home
