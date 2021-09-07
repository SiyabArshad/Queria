import Page404 from "./pages/Notfound/Page404";
import Home from "./pages/Home/Home";
import Single from "./pages/singlepage/Single";
import Admin from "./pages/Admin/Admin";
import Users  from './pages/Users/Users'
import Register from "./pages/Register/Register";
import Updateuser from "./pages/Updateuser/Updateuser";
import Login from "./pages/Login/Login";
import Addpost from "./pages/Addposts/Addpost";
import Posts from "./pages/Posts/Posts";
import {BrowserRouter as Router,Route,Redirect,Switch} from 'react-router-dom' 
import Updatepost from './pages/Updatepost/Updatepost'
import {useContext} from 'react'
import {AuthContext} from './context/context'
function App() {
  const {user}=useContext(AuthContext)
  return (
    <>
    <Router>
    <Switch>
    <Route exact path='/'>
      <Home></Home>
    </Route>
    <Route  path='/post/:postid'>
      <Single></Single>
    </Route>
    <Route  path='/Admin'>
     { user?<Admin></Admin>:<Redirect to='/Login'></Redirect>}
    </Route>
    <Route  path='/Login'>
     {user?<Redirect to='/Admin'/>:<Login></Login>}
    </Route>
    <Route  path='/Register'>
    { user?<Register></Register>:<Redirect to='/Login'></Redirect>}
    </Route>
    <Route  path='/Users'>
     { user?<Users></Users>:<Redirect to='/Login'></Redirect>}
    </Route>
   <Route  path='/Updateuser/:userid'>
    {user ?<Updateuser></Updateuser>:<Redirect to='/Login'></Redirect>}
   </Route>
   <Route  path='/posts'>
   { user?  <Posts></Posts> :<Redirect to='/Login'></Redirect>}
   </Route>
   <Route  path='/addposts'>
   { user?<Addpost></Addpost>:<Redirect to='/Login'></Redirect>}
   </Route>
   <Route  path='/Updateposts/:postid'>
   { user? <Updatepost></Updatepost>:<Redirect to='/Login'></Redirect>}
   </Route>
  <Route>
<Page404></Page404>    
  </Route>
    </Switch>     
    </Router> 
    </>
  );
}

export default App;
