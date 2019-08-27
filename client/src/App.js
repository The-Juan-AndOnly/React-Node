import React,{useState, useEffect} from 'react';

import './App.css';

function App() {

  const [api, setApi]=useState();
  const [isLoading,setIsLoading] =useState(true);

  useEffect(()=>{
    // const fetchData= async()=>{
    //   const response = await fetch('http://localhost:5000/api/courses');
    //   const data = await response.json();
    // //  console.log(data);
    // setApi(data.courses)
    // setIsLoading(false)
    // console.log(api)
    // console.log(isLoading)
    fetch('http://localhost:5000/api/courses').then(resp=>resp.json()).then(data=>{
      setApi(data.courses)
      setIsLoading(false)
      
    }).catch(err=>console.log(err))
    // }
// fetchData();
  },[])
  
  
  return (
    <div className="App">
      <h1>Hello </h1>
      <ul style={{listStyle:'none'}}>
      {isLoading ? "...Loading":(
        api.map(course=>{
          return<li style={{margin:"1rem 0"}}key={course.id}>{course.title}</li>})
      )}
      </ul>
 
    </div>
  );
}

export default App;
