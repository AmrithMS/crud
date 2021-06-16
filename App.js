import React,{useState,useEffect} from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [PersonName,setPersonName] = useState("");
  const [PhoneNumber,setPhoneNumber] = useState(0);
  const [NewPersonName,setNewPersonName] = useState("");
  const [PhoneList,setPhoneList] = useState([]);

  const addToList = () => {
    axios.post("http://localhost:8000/insert",{
      personName: PersonName,
      phoneNumber: PhoneNumber
    });
  };

  const updatePhone = (id) => {
    axios.put("http://localhost:8000/update",{
      id: id,
      NewPersonName: NewPersonName
    });
  };

  const deletePhone = (id) => {
    axios.delete(`http://localhost:8000/delete/${id}`);
  };

  useEffect(()=>{
    axios.get("http://localhost:8000/read").then((response)=>{
      setPhoneList(response.data)
    })
  },[]);

  return (
    <div className="App">
     
     <h1>CRUD USING REACT</h1>

      <label>Person Name:</label>
      <input type="text"
        onChange = {(event) => {
          setPersonName(event.target.value);
        }}
      />

      <label>PhoneNumber:</label>
      <input type="Number"
        onChange = {(event) => {
          setPhoneNumber(event.target.value);
        }}
      />

      <button onClick = {addToList}> Add </button>

      <h1>Phone Number List</h1>

      {PhoneList.map((val,key)=>{
        return <div key={key} >
          <h1>Phone Number:{val.PhoneNumber}</h1>
          <h1>Name: {val.Name}</h1>
          <input 
            type="text" placeholder="new contact info" 
            onChange = {(event) => {
              setNewPersonName(event.target.value);
            }}
          />
          <button onClick={()=>updatePhone(val._id)}>Update</button>
          <button onClick={()=>deletePhone(val._id)}>Delete</button>
        </div>
      })}

    </div>
  );
}

export default App;
