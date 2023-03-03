import './navbar1.css';
import React from 'react';
import Notifications from 'react-notifications-menu';
import { useState } from 'react';


function Navbar1()  {

  const DEFAULT_NOTIFICATION = {
    image:
      "",
    message: "Notification one.",
    detailPage: "/events",
    receivedTime: "12h ago"
  };
  const [data, setData] = useState([DEFAULT_NOTIFICATION]);
  const [clicked, setClicked] = React.useState(false);


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
        <Notifications
          data={data}
          header={{
            title: "Notifications",
            option: { text: "View All", onClick: () => console.log("Clicked") }
          }}
          markAsRead={(data) => {
            console.log(data);
          }}
          
        />
        
      </div>
      <div className="fas">
        <i className="fas fa-user"></i>
      </div>
      </div>
    </nav>
    </>
    );
}

export default Navbar1