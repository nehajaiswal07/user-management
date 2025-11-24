import { Link } from "react-router-dom";

/*
  UserList - displays users in a responsive table.
  Props:
    users: array of user objects
    onDelete: function(id) to delete user
*/
export default function UserList({ users, onDelete }) {
  if (!users || users.length === 0) return <p>No users found.</p>;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Phone</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.phone}</td>
              <td>
                <Link to={`/edit/${u.id}`} className="btn edit">Edit</Link>
                <button className="btn delete" onClick={() => onDelete(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
