import React from "react";
import { useHistory } from "react-router-dom";
export function EditRenderer(props) {
  const history = useHistory();
  const handleEdit = function (e) {
    console.log(e.target, props.value);
    history.push("/createuser/" + props.value);
  };
  return <button onClick={handleEdit}>Edit</button>;
}
