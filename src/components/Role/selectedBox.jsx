import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
    import { getRole } from '../../redux/roleSlice'

  const SelectedRole = () => { 
    const optionList = useSelector(state => state.roles)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getRole());
    },[])

    return (
      <>
        <option disabled = {false} >Default</option> 
          {optionList.map((item) => (                                                       
            <option key={item.id} value={item.id}>                           
              {item.name}                                    
            </option>                                                            
          ))}                   
      </>
    )
  }

  export default SelectedRole;