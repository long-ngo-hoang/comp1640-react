import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
    import { getProfiles } from '../../redux/usersSlice'

  const ViewRoles = () => { 
  
    const dispatch = useDispatch()
    const {loading,error, users }=  useSelector(
        (state) => state.user
        )



    useEffect(()=>{
        dispatch(getProfiles(),[]);
    },[])

    const renderRole = (
        <div>
        {/* {users?.map((item) => (
        <div key={item.id}>
            <p>{item.name} </p>   
          </div>
                    ))} */}
                    <h2>{users.id}</h2>
        </div>
      );

    return (
      <>
       {loading ?(<h2>page loadding</h2>) :renderRole}
       

      </>
    )
  }

  export default ViewRoles;