import React,{useEffect,useState} from 'react'
import './admin.css'
import axios from 'axios'
import Sidebar from '../../components/Sidenav/Sidebar'
import Widget from '../../components/Widgets/Widget'
const Admin = () => {
    const [totaluser,settotaluser]=useState('')
    const [totalposts,settotalposts]=useState('')
    useEffect(()=>{
        fetchtotalusers()
        fetchtotalposts()
    },[])
    const fetchtotalusers=async()=>{
      const res=await axios.get('totalusers', {
        headers: {
          token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        },
      })
      settotaluser(res.data)
    }

    const fetchtotalposts=async()=>{
        const res=await axios.get('totalposts', {
          headers: {
            token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          },
        })
        settotalposts(res.data)
      }
    return (
        <div className="mainadmin">
            <div className="sdb"><Sidebar></Sidebar></div>
            <div className="widg">
            <Widget totaluser={totaluser} data="USER"></Widget>
            <Widget totaluser={totalposts} data="POSTS"></Widget></div>
        </div>
    )
}

export default Admin
