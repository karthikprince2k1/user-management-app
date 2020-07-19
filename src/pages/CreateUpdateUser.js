import React from "react";
import { useForm } from "react-hook-form";
import Input from "../common/src/components/Input/Input";
import DropDown from "../common/src/components/DropDown/DropDown";
import CustomDatePicker from "../common/src/components/CustomDatePicker/CustomDatePicker";

import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import "../styles/createUser.css";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  suffix: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  dateOfBirth: yup.string().required(),
  // gender: yup.string().required,
  // role: yup.string().required,
  // contacts: yup.array().of(
  //   yup.object().shape({
  //     type: yup.string().required,
  //     contact: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  //   })
  // ),
});

export default function App() {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-user-form">
      <DropDown
        label="Suffix*"
        name="suffix"
        ref={register}
        options={["Mr.", "Mrs."]}
      />
      <p>{errors.suffix?.message}</p>
      <Input
        label="First Name*"
        name="firstName"
        register={register}
        required
      />
      <p>{errors.firstName?.message}</p>
      <Input label="Last Name*" name="lastName" register={register} required />
      <p>{errors.lastName?.message}</p>
      <Input label="Email*" register={register} name="email" required />
      <p>{errors.email?.message}</p>
      <CustomDatePicker
        label="Date of Birth*"
        name="dateOfBirth"
        register={register}
        required
      />
      <p>{errors.dateOfBirth?.message}</p>
      <input type="submit" />
    </form>
  );
}
