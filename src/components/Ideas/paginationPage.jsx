import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  useMatch, useNavigate  } from 'react-router-dom'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink,
} from "mdb-react-ui-kit";



function PaddingPage(){

    const {loading,error, totalpage} =  useSelector(
    (state) => state.ideas
    );
   
  const location = useLocation();
  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState("")
  const pathname = location.pathname.split("/")[2]

  const handleClick = (e) => {
    setCurrentPage(e.target.id) 
    navigate(`/ideas/${pathname}/${e.target.id}`)
  }


  const pageNumbers = [];
  for (let i = 1; i <= totalpage; i++) {
    pageNumbers.push(i);
  }

    return (
      <>
       <nav aria-label='...'>
      <MDBPagination size='sm' className='mb-0' style={{justifyContent: "center"}}>
      {pageNumbers?.map(number =>
              (
        <MDBPaginationItem>
          <MDBPaginationLink key={number}  id={number} onClick={handleClick}>{number}</MDBPaginationLink>
        </MDBPaginationItem>
        ))}    

      </MDBPagination>
    </nav>
        {/* <nav aria-label="Page navigation example">
          <ul className="pagination">
            {pageNumbers?.map(number =>
              (
                <li className ="page-item" >       
                  <a className ="page-link" value={currentPage}
                    key={number}
                    id={number}
                    onClick={handleClick}>{number}
                  </a>
                </li> 
              ))}    
            </ul>
          </nav> */}
      </>
    );
}

export default PaddingPage;