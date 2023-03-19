import React, { useEffect } from 'react'
  import { useSelector, useDispatch } from 'react-redux'
    import { getNotifications } from '../../redux/notificationSlice'

  const ViewNotification = () => { 
  
    const dispatch = useDispatch()
    const {loading,error, notification} =  useSelector(
        (state) => state.notification
        );
    useEffect(()=>{
        dispatch(getNotifications());
    },[])

    const renderNotification = (
        <div>
        {notification?.map((item) => (
        <div key={item.id}>
            <p>{item.Description} </p>   
          </div>
                    ))}
        </div>
      );

    return (
      <>
       {loading ?(<h2>page loadding</h2>) :renderNotification}
       

      </>
    )
  }

  export default ViewNotification;