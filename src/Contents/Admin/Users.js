import { useEffect } from "react";
import useUserStore from "../../Stores/useUserStore";

export default function Users() {
  const { users, allUsers } = useUserStore();
  useEffect(() => {
    allUsers();
  }, [allUsers]);
  return (
    <div className="Box">
      <h1>Utilisateurs</h1>

      <table className="Liste">
        <thead>
          <tr>
            <th style={{ width: "100px" }}>Username</th>
            <th>Email</th>
            <th style={{ width: "50px" }}>Notes</th>
            <th style={{ width: "50px" }}>Critiques</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((item) => (
              <tr key={item._id}>
                <td style={{ width: "100px" }}>{item.username}</td>
                <td>{item.email}</td>
                <td style={{ width: "50px" }}>{item.notes.length}</td>
                <th style={{ width: "50px" }}>{item.userReviews.length}</th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
