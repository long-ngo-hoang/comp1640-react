import React, { useEffect , useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getNotifications } from '../../redux/notificationSlice'
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBTable,MDBIcon
} from 'mdb-react-ui-kit';

const ViewNotification = () => { 
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);
  const dispatch = useDispatch()
  const { notification} =  useSelector(
    (state) => state.notification
  );
    
  useEffect(()=>{
        dispatch(getNotifications());
  },[])

  return (
      <>
       <button  style={{background: "none", border: "none"}}  onClick={toggleShow}><MDBIcon fas icon="bell" color="none" size="lg"/></button>
      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Notifications</MDBModalTitle>
              <MDBBtn className='btn-close' color='none'  onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
            <MDBTable>
      {notification?.map((item) => (

        <tr key={item.id}>
          <td>{item.description} </td>
        </tr>
                            ))}

        </MDBTable>
            </MDBModalBody>

            <MDBModalFooter>
              <button className='btn btn-primary' onClick={toggleShow}>
                Close
              </button>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

      </>
    )
  }

  export default ViewNotification;