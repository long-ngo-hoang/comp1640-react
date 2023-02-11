import axios from 'axios';
import React from 'react';

export default function GetData(){
    const [data,setData] = React.useState([]);
  
    React.useEffect(() => {
      axios.get(`https://localhost:44393/WeatherForecast`)
      .then((res) =>  {
        setData(res.data)
        console.log(res);
    }).catch(err => console.log(err))
    }, [])
    
    return (
        <>
         <ul>
            {data.map(data => (
                <><li key={data.date}>{data.date}</li><li>{data.temperatureC}</li><li>{data.temperatureF}</li><li>{data.summary}</li></>

            ))}
        </ul>
  
          </> 
    )
  }