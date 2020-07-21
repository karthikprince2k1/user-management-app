import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../common/src/components/Input/Input";
import DropDown from "../common/src/components/DropDown/DropDown";
import CustomDatePicker from "../common/src/components/CustomDatePicker/CustomDatePicker";
import RadioButton from "../common/src/components/RadioButton/RadioButton";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import "../styles/createUser.css";
import MultiSelectDropDown from "../common/src/components/MultiSelectDropDown/MultiSelectDropDown";
import ContactsTable from "../components/ContactsTable";
import { useParams, Link, useHistory } from "react-router-dom";
import {
  getUserByUserId,
  getContactsByUserId,
  createUser,
  replaceUser,
} from "../helpers/userHelpers";
import { useDispatch } from "react-redux";
import { updateContacts } from "../actions/contactActions";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  suffix: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  dateOfBirth: yup.date().required(),
  gender: yup.string().required(),
  role: yup.string().required(),
});

const initialFormState = {
  suffix: "Mr.",
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: null,
  gender: null,
  role: null,
};

const getFormattedDate = (dob) => {
  const year = dob.getFullYear();
  const mm = parseInt(dob.getMonth(), 10) + 1;
  const month = mm <= 9 ? "0" + mm : mm;
  const dd = parseInt(dob.getDate(), 10);
  const day = dd < 10 ? "0" + dd : dd;
  const val = year + "-" + month + "-" + day;
  return val;
};
const getRole = (role) => {
  debugger;
  let result = role
    .split(",")
    .map((r) => r.toLowerCase())
    .join(";");
  return result;
};
export default function () {
  const { register, handleSubmit, errors, setValue, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const { userId } = useParams();
  const onSubmit = (data) => {
    const reqObj = {};
    reqObj.firstname = data.firstName;
    reqObj.lastname = data.lastName;
    reqObj.dateofbirth = getFormattedDate(data.dateOfBirth);
    reqObj.email = data.email;
    reqObj.gender = data.gender;
    reqObj.role = getRole(data.role);
    reqObj.suffix = data.suffix;
    let pushUser = createUser;
    if (userId > 0) {
      reqObj.userId = userId;
      pushUser = replaceUser;
    }

    pushUser(reqObj)
      .then((res) => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        console.log(res);
        history.push("/viewusers");
      })
      .catch((err) => console.log(err));
  };

  const [initialValues, setInitialValues] = useState(initialFormState);
  const dispatch = useDispatch();
  useEffect(() => {
    if (userId > 0) {
      getUserByUserId(userId).then((userData) => {
        const user = userData.data;
        const newFormState = { ...initialValues };
        newFormState.suffix = user.suffix;
        newFormState.firstName = user.firstname;
        newFormState.lastName = user.lastname;
        newFormState.email = user.email;
        newFormState.dateOfBirth = user.dateofbirth;
        newFormState.gender = user.gender;
        newFormState.role = user.role;
        console.log(userData.data, newFormState);
        setInitialValues(newFormState);
      });
      getContactsByUserId(userId).then((res) => {
        if (res.error) {
          console.error(res.error);
          return;
        }
        dispatch(updateContacts(res.data));
      });
    } else {
      dispatch(updateContacts([]));
    }
  }, []);
  const handleCancel = (e) => {
    reset();
  };
  return (
    <>
      <h1>Create/Update User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="create-user-form">
        <DropDown
          label="Suffix*"
          name="suffix"
          ref={register}
          options={["Mr.", "Mrs."]}
          defaultValue={initialValues.suffix}
        />
        <p>{errors.suffix?.message}</p>
        <Input
          label="First Name*"
          name="firstName"
          register={register}
          required
          defaultValue={initialValues.firstName}
        />
        {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
        <Input
          label="Last Name*"
          name="lastName"
          register={register}
          required
          defaultValue={initialValues.lastName}
        />
        {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
        <Input
          label="Email*"
          register={register}
          name="email"
          required
          defaultValue={initialValues.email}
        />
        {errors.email?.message && <p>{errors.email?.message}</p>}
        <CustomDatePicker
          label="Date of Birth*"
          name="dateOfBirth"
          register={register}
          required
          defaultValue={initialValues.dateOfBirth}
        />
        {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}
        <div className="radio-btn">
          <label>Gender*</label>
          <RadioButton
            name="gender"
            label="Male"
            value="male"
            register={register}
            required
            defaultValue={initialValues.gender}
          />
          <RadioButton
            name="gender"
            label="Female"
            value="female"
            register={register}
            required
            defaultValue={initialValues.gender}
          />
          <RadioButton
            name="gender"
            label="Others"
            value="others"
            register={register}
            required
            defaultValue={initialValues.gender}
          />
        </div>
        {errors.gender?.message && <p>{errors.gender?.message}</p>}
        <label>Role*</label>
        <MultiSelectDropDown
          options={["Read", "Write", "Admin", "Super"]}
          name="role"
          setValue={setValue}
          register={register}
          defaultValue={initialValues.role}
        />
        {<p>{errors.role?.message}</p>}
        <div>
          <label>Contacts:</label>
          <span></span>
        </div>
        <div className="createuser-contacts-table">
          <ContactsTable userId={userId} />
        </div>

        <div className="row-submit">
          <input type="submit" />
          <input type="button" onClick={handleCancel} value="Cancel" />
        </div>
      </form>
    </>
  );
}
