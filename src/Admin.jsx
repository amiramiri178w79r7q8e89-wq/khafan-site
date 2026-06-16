import { useEffect, useState } from "react";

export default function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://khafan-site.onrender.com/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div className="admin">
      <h1>Admin Panel</h1>

      <table>
        <thead>
          <tr>
            <th>Phone</th>
            <th>Code</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u, i) => (
            <tr key={i}>
              <td>{u.phone}</td>
              <td>{u.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}