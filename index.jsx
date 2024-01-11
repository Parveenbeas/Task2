import React, { useEffect, useState } from "react";
import axios from "axios";

const Task2 = () => {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    username: "",
  });

  useEffect(() => {
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        const multiple = response.data.users;
        setUsers(multiple);
      })
      .catch((error) => {
        console.log(error, "some error");
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        console.log("Delete successful", response);
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting user", error);
      });
  };

  const handleEdit = (user) => {
    setEditingUserId(user.id);
    setEditedUser({
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
      username: user.username,
    });
  };

  const handleSaveEdit = () => {
    // Perform the API call to update the user data
    // For example: axios.put(`https://dummyjson.com/users/${editingUserId}`, editedUser)
    // Update the local state after a successful edit
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUserId ? { ...user, ...editedUser } : user
      )
    );
    setEditingUserId(null);
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  return (
    <div className="container mx-auto p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white p-6 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            {editingUserId === user.id ? (
              <div>
                <input
                  type="text"
                  value={editedUser.firstName}
                  onChange={(e) =>
                    setEditedUser({ ...editedUser, firstName: e.target.value })
                  }
                />
                {/* Add other input fields for other user properties */}
                <button onClick={handleSaveEdit}>Save</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </div>
            ) : (
              <>
                {/* Display user information */}
                <p className="text-xl font-semibold mb-2">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-gray-600 mb-2">{user.phone}</p>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-gray-600 mb-2">@{user.username}</p>

                {/* Edit and Delete buttons */}
                <div className="flex space-x-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Task2;
