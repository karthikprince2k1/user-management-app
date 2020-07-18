import React from "react";
import { useForm } from "react-hook-form";
import Input from "../common/src/components/Input/Input";
import DropDown from "../common/src/components/DropDown/DropDown";

import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import "../styles/createUser.css";

const schema = yup.object().shape({
  suffix: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
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
      <input type="submit" />
    </form>
  );
}
