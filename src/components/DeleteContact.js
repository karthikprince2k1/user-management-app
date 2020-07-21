import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteContactByContactId,
  getContactsByUserId,
} from "../helpers/userHelpers";
import { useParams } from "react-router-dom";
import { updateContacts } from "../actions/contactActions";
export function DeleteContact(props) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const handleDelete = function (e) {
    if (window.confirm("Do you want to delete contact?")) {
      debugger;
      deleteContactByContactId(userId, props.value).then((data) => {
        console.log("Successfully Deleted", data);

        getContactsByUserId(userId).then((res) => {
          console.log(res.data);
          dispatch(updateContacts(res.data));
        });
      });
    } else {
      // Do nothing!
      console.log("Nothing deleted");
    }
  };
  return <button onClick={handleDelete}>Delete</button>;
}
