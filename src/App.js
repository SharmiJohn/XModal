import { useState , useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [Open, setOpen] = useState(false);
  const[userName,setuserName]=useState("");
  const[phone,setphone]=useState("");
  const[email,setemail]=useState("");
  const[dob,setdob]=useState("");
  const modalRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = () => {
    setOpen(true);
  };
  const Email=(email)=>{
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(email);
    if(!isValid){
      alert("Invalid email. Please check your email address.");
      return false
    }
    else{
      return true;
    }
  }
  const Phone=(phone)=>{
    const pattern = /^\d{10}$/;
    const isValid = pattern.test(phone);
    if(!isValid){
      alert("Invalid phone number. Please enter a 10-digit phone number.");
      return false
    }
    else{
      return true;
    }
  }
  const date=(dob)=>{
    let today=new Date();
    if(today<new Date(dob)){
      alert("Invalid date of birth.Date of birth cannot be in future")
      return false;
    }
    return true

  }
  const handleSubmit=(e)=>{
    e.preventDefault();
    const emailValidate=Email(email);
    const phoneValidate=Phone(phone);
    const dateValidate=date(dob);
    if(emailValidate&& phoneValidate&&dateValidate){
      setuserName("")
      setphone("")
      setemail("")
      setdob("")
    }
    
  }
  return (
    <>
      <div className="App">
        <h1>User Details Modal</h1>
        <button onClick={() => handleClick()}>Open Form</button>
      </div>
      {Open && (
        <div className="modal">
          <div className="modal-content" style={{width:"300px"}}  ref={modalRef}>
            <form style={{display:"flex",flexDirection:"column" ,justifyContent:'center',alignItems:"center"}} onSubmit={(e)=>handleSubmit(e)}>
              <h3>Fill Details</h3>
              <label>Username:</label>
              <input type="text" id="username" value={userName} onChange={(e)=>setuserName(e.target.value)} required />
              <label>Email Address:</label>
              <input type="email" id="email" value={email} onChange={(e)=>setemail(e.target.value)} required/>
              <label>Phone Number:</label>
              <input type="tel" id="phone" value={phone} onChange={(e)=>setphone(e.target.value)} required/>
              <label>Date of Birth:</label>
              <input type="date" id="dob" value={dob} onChange={(e)=>setdob(e.target.value)} required/>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
