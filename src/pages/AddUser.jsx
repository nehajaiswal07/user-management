import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "../components/UserForm";

/*
 AddUser.jsx
 - Shows form to create user.
 - Submits POST to JSONPlaceholder (simulated).
*/

export default function AddUser(){
  const navigate = useNavigate();
  const [formData,setFormData] = useState({ name:"", email:"", phone:"" });
  const [saving,setSaving] = useState(false);
  const [error,setError] = useState("");

  async function handleSubmit(e){
    e.preventDefault();
    setError("");
    setSaving(true);
    try{
      const res = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(formData)
      });
      if(!res.ok) throw new Error("Failed to create");
      const result = await res.json();
      // JSONPlaceholder returns created object with id
      alert("User created (simulated). ID: " + result.id);
      navigate("/");
    }catch(err){
      console.error(err);
      setError("Failed to create user.");
    }finally{
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Add User</h1>
        <div className="actions">
          <button className="btn" onClick={()=>navigate("/")}>Back</button>
        </div>
      </div>

      {error && <div className="message">{error}</div>}
      <UserForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
      {saving && <p style={{textAlign:"center"}}>Saving...</p>}
    </div>
  );
}
