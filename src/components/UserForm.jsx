/*
  UserForm - reusable form for Add and Edit pages.
  Props:
    formData, setFormData, onSubmit
*/
export default function UserForm({ formData, setFormData, onSubmit }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      <label>
        Name
        <input
          type="text"
          value={formData.name || ""}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
      </label>

      <label>
        Phone
        <input
          type="text"
          value={formData.phone || ""}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />
      </label>

      <div style={{display:'flex', gap:10, justifyContent:'flex-end'}}>
        <button type="submit" className="btn submit">Save</button>
      </div>
    </form>
  );
}
