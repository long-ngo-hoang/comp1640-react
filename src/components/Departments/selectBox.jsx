import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
    import { getDepartments } from '../../redux/departmentsSlice'

  const SelectedDepartment = () => { 
    const optionList = useSelector(state => state.departments)
    const dispatch = useDispatch()

    
    useEffect(()=>{
        dispatch(getDepartments(),[]);
    },[])

    return (
      <>
        <option disabled = {false} >Default</option> 
          {optionList?.departments?.map((item) => (                                                       
            <option key={item.id} value={item.id}>                           
              {item.name}                                    
            </option>                                                            
          ))}                   
          
      </>
    )
  }

  export default SelectedDepartment;