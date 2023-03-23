import './navbar1.css';
import React from 'react';
import {  useNavigate ,Link } from 'react-router-dom'
import { useState } from 'react';

import {persistor} from '../../redux/store';
import { logout } from "../../redux/accountsSlice";
import { useDispatch } from 'react-redux'

function Navbar1()  {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const DEFAULT_NOTIFICATION = {
    image:
      "",
    message: "Notification one.",
    detailPage: "/events",
    receivedTime: "12h ago"
  };
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [clicked, setClicked] = React.useState(false);

  const handleLogout = async () =>  {
   await dispatch(logout());
    navigate('/') 
    persistor.purge()
  }
  const handleClick = () =>{
    setClicked(!clicked)
}
    return(
  
    <> 
    <nav>
      <div>
        <ul id="navbar" className={clicked ? "#navbar active":"#navbar"}>
          <li><a href="index.html">Department 1</a></li>
          <li><a href="manageideas">Manage Ideas</a></li>
          <li><a href="index.html">View All Ideas</a></li>
          <li><a href="index.html">Create Ideas</a></li>
        </ul>
      </div>
      <div id="mobile" onClick={handleClick}>

        <i id="bar"
        className={clicked ? "fas fa-times":"fas fa-bars"}></i>
      </div>
      <div>
      <div className="fas">
        {/* <Notifications
          data={data}
          header={{
            title: "Notifications",
            option: { text: "View All", onClick: () => console.log("Clicked") }
          }}
          markAsRead={(data) => {
            console.log(data);
          }}
          
        /> */}
        
      </div>
      <div className="fas">
        <i className="fas fa-user"></i>
        <Link  onClick={() => handleLogout()} className="fa fa-sign-out"> 
        </Link>
      </div>
      </div>
    </nav>
    </>
    );
}

export default Navbar1