import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserForm from "../components/UserForm";
import Spinner from "../components/Spinner";

/*
 EditUser.jsx
 - Loads user by id and pre-fills form.
 - Submits PUT to JSONPlaceholder (simulated).
*/

export default function EditUser(){
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData,setFormData] = useState({ name:"", email:"", phone:"" });
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [error,setError] = useState("");

  useEffect(()=>{
    let mounted=true;
    async function load(){
      try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if(!res.ok) throw new Error("Not found");
        const data = await res.json();
        if(mounted) setFormData({ name: data.name || "", email: data.email || "", phone: data.phone || "" });
      }catch(err){
        setError("Failed to load user.");
      }finally{
        if(mounted) setLoading(false);
      }
    }
    load();
    return ()=> mounted=false;
  },[id]);

  async function handleSubmit(e){
    e.preventDefault();
    setSaving(true);
    setError("");
    try{
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify(formData)
      });
      if(!res.ok) throw new Error("Update failed");
      alert("User updated (simulated).");
      navigate("/");
    }catch(err){
      console.error(err);
      setError("Failed to update user.");
    }finally{
      setSaving(false);
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Edit User</h1>
        <div className="actions">
          <button className="btn" onClick={()=>navigate("/")}>Back</button>
        </div>
      </div>

      {loading ? <Spinner/> : error ? <div className="message">{error}</div> :
        <>
          <UserForm formData={formData} setFormData={setFormData} onSubmit={handleSubmit} />
          {saving && <p style={{textAlign:"center"}}>Saving...</p>}
        </>
      }
    </div>
  );
}
