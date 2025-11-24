import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserList from "../components/UserList";
import Spinner from "../components/Spinner";

/*
 Home.jsx
 - Fetches users from JSONPlaceholder and displays them.
 - Allows delete (simulated).
 - Shows loading spinner & error handling.
*/

export default function Home(){
  const [users,setUsers] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error,setError] = useState("");

  useEffect(()=>{
    let mounted = true;
    async function load(){
      try{
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        if(!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if(mounted) setUsers(data);
      }catch(err){
        console.error(err);
        setError("Failed to load users. Check your network.");
      }finally{
        if(mounted) setLoading(false);
      }
    }
    load();
    return ()=> { mounted=false; }
  },[]);

  async function handleDelete(id){
    if(!confirm("Delete this user?")) return;
    try{
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { method: "DELETE" });
      if(!res.ok) throw new Error("Delete failed");
      // Remove from UI (JSONPlaceholder won't persist)
      setUsers((prev)=> prev.filter(u=>u.id !== id));
    }catch(err){
      alert("Delete failed.");
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h1>User Management</h1>
        <div className="actions">
          <Link to="/add"><button className="btn add-btn">+ Add User</button></Link>
        </div>
      </div>

      {loading ? <Spinner/> : error ? <div className="message">{error}</div> : <UserList users={users} onDelete={handleDelete} /> }
    </div>
  );
}
