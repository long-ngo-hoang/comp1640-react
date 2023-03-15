import React, {useEffect, useState } from 'react';
import axios from 'axios';



export default  function UploadFile() {
    const [fileUpload, setFileUpload] = useState(null);
    const [documentUrlList, setDocumentUrlList] = useState();
   

    const uploadHandler = async (e) =>{
        setFileUpload(e.target.files[0]);
            const instance = axios.create({
        baseURL: 'https://localhost:7044'
      });
    
    const response = await instance
        .get('/Ideas/GetS3PreSignedUrl');

    var config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: response.data.preSignedUrl,
        headers: { 
            'Content-Type': 'image/jpeg'
        },
        data : e.target.files[0]
    };

  axios(config)
  .then(function (response) {
  })
  .catch(function (error) {
  });
    }
    
    return(
        <>
        <label htmlFor="formFileMultiple" className="form-label">Multiple files input example</label>
        <input className="form-control" onChange={uploadHandler} type="file" id="formFileMultiple" multiple />
        <img src={documentUrlList}/>
        </>
    )
}