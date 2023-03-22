import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {  useNavigate  } from 'react-router-dom'
import { useState } from 'react'



function PaddingPage(){

    const {loading,error, totalpage} =  useSelector(
    (state) => state.ideas
    );

  const navigate = useNavigate()
  const [currentPage, setCurrentPage] = useState("")

  const handleClick = (e) => {
    setCurrentPage(e.target.id) 
    navigate(`/ideas/myideas/${e.target.id}`)
  }


  const pageNumbers = [];
  for (let i = 1; i <= totalpage; i++) {
    pageNumbers.push(i);
  }


  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        value={currentPage}
        key={number}
        id={number}
        onClick={handleClick}
      >
        {number}
      </li>
    );
  });

return (
  <>
    <ul id="page-numbers">
        {renderPageNumbers}
      </ul>
  </>
);
}

export default PaddingPage;