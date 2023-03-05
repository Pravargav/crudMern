import React, { useState ,useEffect} from 'react';
import './App.css';
import Axios from 'axios';

function App() {
  const [fName,setfName]=useState("");
  const [days,setDays]=useState(0);
  const [flist,setflist]=useState([]);
  const [newfName,setnewfName]=useState("");


  const addToList=()=>{
   Axios.post("http://localhost:8080/insert",{fName:fName,days:days});
  }

  useEffect(()=>{
   Axios.get("http://localhost:8080/read").then((response)=>{
    // console.log(response);
    setflist(response.data);
   })
  },[])

  const updatefood =(id)=>{
    Axios.put("http://localhost:8080/update",{id:id,newfName:newfName});
  }

  const deletefood =(id)=>{
    Axios.delete(`http://localhost:8080/delete/${id}`);
  }

  return (
    <div className="App">
     <h1>crud App With Mern</h1>

     <input type="text" onChange={(event)=>{
      setfName(event.target.value);
     }}/>

     <input type="number" onChange={(event)=>{
      setDays(event.target.value);
     }}/>

     <button onClick={addToList}>addToList</button>

     <h1>fruitslist:</h1>


     {flist.map((val,key)=>{
       return <div>
        <h2>{val.fName}:{val.days}</h2>

        <input type="text" onChange={(event)=>{
          setnewfName(event.target.value);
        }}/>

        <button onClick={()=>updatefood(val._id)}>update</button>
        <button onClick={()=>deletefood(val._id)}>delete</button>
       </div>
     })}
    </div>
  );
}

export default App;
