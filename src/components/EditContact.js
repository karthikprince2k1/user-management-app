import React from "react";
import { useHistory, useParams } from "react-router-dom";
export function EditContact(props) {
  const history = useHistory();
  const { userId } = useParams();
  const handleEdit = function (e) {
    console.log(e.target, props.value, userId);
    history.push("/createuser/" + userId + "/createcontact/" + props.value);
  };
  return <button onClick={handleEdit}>Edit</button>;
}
