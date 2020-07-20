import React, { useEffect, useState } from "react";
import UsersTable from "../components/UsersTable";
import SearchUser from "../components/SearchUser";

const getDate = (strDate) => {
  // converts date in YYYY-MM-DD format to Date
  const dateArr = strDate.split("-");
  const year = parseInt(dateArr[0], 10);
  const month = parseInt(dateArr[1], 10) - 1;
  const day = parseInt(dateArr[2], 10);
  return new Date(year, month, day);
};

async function getUsers() {
  const response = await fetch("http://localhost:8000/users");
  const data = await response.json();
  return data;
}
let fetchedUsers = null;
export default function (props) {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getUsers().then((users) => {
      console.log(users.data);
      setUsers(users.data);
      fetchedUsers = users.data;
    });
  }, []);

  const renderUsersGrid = (users) => {
    return <UsersTable rowData={users} />;
  };
  const handleSearch = (data) => {
    let filteredList = [...fetchedUsers];
    if (data.firstName !== "") {
      filteredList = filteredList.filter(
        (user) => user.firstname.indexOf(data.firstName) > -1
      );
    }
    if (data.lastName !== "") {
      filteredList = filteredList.filter(
        (user) => user.lastname.indexOf(data.lastName) > -1
      );
    }
    if (data.fromDob !== "" || data.toDob !== "") {
      filteredList = filteredList.filter((user) => {
        let isDobAfterFromDate = data.fromDob !== "" ? getDate(user.dateofbirth) >= new Date(data.fromDob) : true;
        let isDobBeforeToDate = data.toDob !== "" ? getDate(user.dateofbirth) <= new Date(data.toDob) : true;
        return isDobAfterFromDate && isDobBeforeToDate;
      });
    }

    setUsers(filteredList);
  };
  const resetSearch = () => {
    setUsers([...fetchedUsers]);
  };

  return (
    <>
      <h1>View Users</h1>
      <SearchUser handleSearch={handleSearch} resetSearch={resetSearch} />

      {users && renderUsersGrid(users)}
    </>
  );
}
