import React, { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = () => {
    setIsLoading(true);
    fetch("https://randomuser.me/api/?results=10")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-list">
      <button onClick={fetchUsers}>Get New Persons</button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user, index) => (
            <li key={index}>
              <img src={user.picture.large} alt="" />
              <h3>
                {user.name.first} {user.name.last}
              </h3>
              <p>E-mail: {user.email} </p>
              <p>
                {user.location.country} / {user.location.city}
              </p>
              <p>Phone Number: {user.phone}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;
