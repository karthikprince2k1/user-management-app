import React, { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import SearchUser from "../components/SearchUser";

async function getUsers() {
  const response = await fetch("http://localhost:8000/users");
  const data = await response.json();
  return data;
}

export default function (props) {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    getUsers().then((users) => {
      console.log(users.data);
      setUsers(users.data);
    });
  }, []);

  const renderUsersGrid = (users) => {
    return <UsersTable rowData={users} />;
  };

  return (
    <>
      <h1>View Users</h1>
      <SearchUser />

      {users && renderUsersGrid(users)}
    </>
  );
}
