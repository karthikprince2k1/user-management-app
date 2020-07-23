import React, { useEffect } from "react";
import UsersTable from "../components/UsersTable";
import SearchUser from "../components/SearchUser";
import { getUsers, getUserByContact } from "../helpers/userHelpers";
import { updateUsers } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

const getDate = (strDate) => {
  // converts date in YYYY-MM-DD format to Date
  const dateArr = strDate.split("-");
  const year = parseInt(dateArr[0], 10);
  const month = parseInt(dateArr[1], 10) - 1;
  const day = parseInt(dateArr[2], 10);
  return new Date(year, month, day);
};

export default function (props) {
  const dispatch = useDispatch();
  const fetchedUsers = useSelector((state) => state.users);
  useEffect(() => {
    getUsers().then((users) => {
      console.log(users.data);
      dispatch(updateUsers(users.data));
    });
  }, []);
  const handleSearch = (data) => {
    let filteredList = [...fetchedUsers];
    if (data.contact !== "") {
      getUserByContact(data.contactType, data.contact).then((res) => {
        dispatch(updateUsers(res.data));
      });
    }

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
        let isDobAfterFromDate =
          data.fromDob !== ""
            ? getDate(user.dateofbirth) >= new Date(data.fromDob)
            : true;
        let isDobBeforeToDate =
          data.toDob !== ""
            ? getDate(user.dateofbirth) <= new Date(data.toDob)
            : true;
        return isDobAfterFromDate && isDobBeforeToDate;
      });
    }

    dispatch(updateUsers(filteredList));
  };
  const resetSearch = () => {
    getUsers().then((users) => {
      console.log(users.data);
      dispatch(updateUsers(users.data));
    });
  };

  return (
    <>
      <h1>View Users</h1>
      <SearchUser handleSearch={handleSearch} resetSearch={resetSearch} />
      <UsersTable />
    </>
  );
}
