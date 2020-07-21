import React from "react";
import { useDispatch } from "react-redux";
import { getUsers, deleteUserByUserId } from "../helpers/userHelpers";
import { updateUsers } from "../actions/userActions";
export function DeleteRenderer(props) {
  const dispatch = useDispatch();
  const handleDelete = function (e) {
    if (window.confirm("Do you want to delete user?")) {
      deleteUserByUserId(props.value).then((data) => {
        console.log("Successfully Deleted", data);

        getUsers().then((users) => {
          console.log(users.data);
          dispatch(updateUsers(users.data));
        });
      });
    } else {
      // Do nothing!
      console.log("Nothing deleted");
    }
  };
  return <button onClick={handleDelete}>Delete</button>;
}
