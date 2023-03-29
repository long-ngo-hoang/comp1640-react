import React , { useEffect, useState } from 'react';
import {  useNavigate ,Link } from 'react-router-dom'
import {persistor} from '../../redux/store';
import { logout } from "../../redux/accountsSlice";
import { useDispatch } from 'react-redux'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBCollapse,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,  
} from 'mdb-react-ui-kit';
import Dropdown from 'react-bootstrap/Dropdown';
import ViewNotification from '../Notifications/view';
import { getMostPopularIdeas } from '../../redux/ideasSlice'
import { getMostViewedIdeas } from "../../redux/ideasSlice";
import jwt_decode from "jwt-decode";

function Navbar1()  {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = localStorage.getItem('token')
  
   const decodedToken = jwt_decode(token);    

  const handleLogout = async () =>  {
   await dispatch(logout());
    navigate('/') 
    persistor.purge()
  }

const [showNavText, setShowNavText] = useState(false);
const [sendRequest, setSendRequest] = useState(false);
const [sendMostView, setSendMostView] = useState(false);
const [currentPage, setCurrentPage] = useState(1)

  //GetPolulation
  useEffect(() => {
    if(sendRequest){
       dispatch(getMostPopularIdeas(currentPage))
       setSendRequest(false);
    }
  },
  [sendRequest]);

//getMostView
  useEffect(() => {
    if(sendMostView){
       dispatch(getMostViewedIdeas(currentPage))
       setSendMostView(false);
    }
  },
  [sendMostView]);

    return(
    <> 
    <MDBNavbar expand='lg' light bgColor='light' >
      <MDBContainer fluid style={{width: "90%"}}>
        <MDBNavbarBrand href='#'>University</MDBNavbarBrand>
        <MDBNavbarToggler
          type='button'
          data-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowNavText(!showNavText)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <MDBCollapse navbar show={showNavText}>
        <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>

          {decodedToken?.Roles === "Administrator" && 
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/departments/view'>
                Manage Departments
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/ideas/view'>
                View Ideas
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/academicYears/view'>
                Manage Academic Years
              </MDBNavbarLink>
            </MDBNavbarItem>          
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/departments/viewUser'>
                Manage Users
              </MDBNavbarLink>
            </MDBNavbarItem> 
            <MDBNavbarItem>
            <MDBNavbarLink active aria-current='page' href='https://localhost:7044/Documents/DownloadZip'>
                Download Documents
              </MDBNavbarLink>
            </MDBNavbarItem> 
            </MDBNavbarNav>

            // https://localhost:7044/Documents/DownloadZip
            }
          {decodedToken?.Roles === "Quality Assurance Manager" && 
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/academicYears/view'>
                Manage Academic Years
              </MDBNavbarLink>
            </MDBNavbarItem>    
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/categories/view'>
                Manage Categories
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
            <MDBNavbarLink active aria-current='page' href='/departments/view'>
                View Departments
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/ideas/view'>
                View Ideas
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/chart'>
               Statistical analysis 
              </MDBNavbarLink>
            </MDBNavbarItem>
            </MDBNavbarNav>
            }

             {decodedToken?.Roles === "Quality Assurance Coordinator" && 
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/ideas/view'>
                View Ideas
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/departments/MyDepartment'>
                My Departments
              </MDBNavbarLink>
            </MDBNavbarItem>
            </MDBNavbarNav>
            }

          {decodedToken?.Roles === "Staff" && 
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/ideas/view'>
                View Ideas
              </MDBNavbarLink>
            </MDBNavbarItem>      
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/ideas/myideas'>
                Manage Ideas
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='/ideas/create'>
                Create Ideas
              </MDBNavbarLink>
            </MDBNavbarItem>
            </MDBNavbarNav>
            }
            
            <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle tag='a' className='nav-link' role='button'>
                  Sort Ideas
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <Dropdown.Item onClick={() => setSendRequest(true)}>Most Popular Ideas</Dropdown.Item >
                  <Dropdown.Item onClick={() => setSendMostView(true)}>Most View Ideas</Dropdown.Item >
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
          </MDBNavbarNav>
          <MDBNavbarLink active aria-current='page' href='/myProfile/view'>
              <button  style={{background: "none", border: "none"}} >
                <MDBIcon fas icon="user"  size="lg"/>
              </button>
          </MDBNavbarLink>
          <MDBNavbarLink active aria-current='page' href='#'>
              <ViewNotification />
          </MDBNavbarLink>
          <MDBNavbarLink active aria-current='page' href='#'>
            <Link onClick={() => handleLogout()}> <MDBIcon fas icon="sign-out"  color="black" size="lg"/></Link>
          </MDBNavbarLink>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
    </>
    );
}

export default Navbar1