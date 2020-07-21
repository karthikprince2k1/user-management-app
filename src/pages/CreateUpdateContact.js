import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../common/src/components/Input/Input";
import DropDown from "../common/src/components/DropDown/DropDown";

import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import "../styles/createUser.css";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  getContactByUserIdAndContactId,
  setContactForUser,
} from "../helpers/userHelpers";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  type: yup.string().required(),
  contact: yup.string().matches(phoneRegExp, "Contact is invalid").required(),
});

const initialFormState = {
  type: "Phone",
  contact: "",
};

export default function () {
  const { register, handleSubmit, errors, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const { userId, contactId } = useParams();
  const history = useHistory();
  const [initialValues, setInitialValues] = useState(initialFormState);
  const [apiError, setApiError] = useState("");
  const onSubmit = (data) => {
    setContactForUser(userId, data)
      .then((res) => {
        if (res.error) {
          setApiError("Error from API:" + res.error);
          return;
        }
        console.log("Updated contact for user", userId, res);
        history.push("/createuser/" + userId);
      })
      .catch((err) => {
        setApiError("Error from API", err);
        console.error(err);
      });
  };
  useEffect(() => {
    if (userId > 0 && contactId > 0) {
      getContactByUserIdAndContactId(userId, contactId).then((contactData) => {
        const contact = contactData.data;
        const newFormState = { ...initialValues };
        newFormState.type = contact.type;
        newFormState.contact = contact.contact;

        console.log(contactData.data, newFormState);
        setInitialValues(newFormState);
      });
      // getContactsByUserId(userId).then((data) => {
      //   console.log("Contact Data", data);
      // });
    }
  }, []);
  const handleCancel = (e) => {
    reset();
  };
  return (
    <>
      <h1>Create/Update Contact</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-user-form">
        <DropDown
          label="Type*"
          name="type"
          ref={register}
          options={["Phone", "Fax", "Office", "Mobile"]}
          defaultValue={initialValues.type}
        />
        <p>{errors.type?.message}</p>
        <Input
          label="Contact*"
          name="contact"
          register={register}
          required
          defaultValue={initialValues.contact}
        />
        {errors.contact?.message && <p>{errors.contact?.message}</p>}
        {apiError !== "" && <p>{apiError}</p>}
        <div className="row-submit">
          <input type="submit" />
          <input type="button" onClick={handleCancel} value="Cancel" />
        </div>
      </form>
    </>
  );
}
