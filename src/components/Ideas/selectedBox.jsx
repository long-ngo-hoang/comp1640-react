import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
    import { getCategories } from '../../redux/categoriesSlice'

  const SelectedBox = () => { 
    const optionList = useSelector(state => state.categories)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getCategories());
    },[])

    return (
      <>
        <option disabled = {false} >Default</option> 
          {optionList.categories.map((item) => (                                                       
            <option key={item.id} value={item.id}>                           
              {item.name}                                    
            </option>                                                            
          ))}                   
      </>
    )
  }

  export default SelectedBox;