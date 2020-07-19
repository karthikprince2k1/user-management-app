import React from "react";
import { useForm } from "react-hook-form";
import Input from "../common/src/components/Input/Input";
import DropDown from "../common/src/components/DropDown/DropDown";
import CustomDatePicker from "../common/src/components/CustomDatePicker/CustomDatePicker";
import RadioButton from "../common/src/components/RadioButton/RadioButton";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";

import "../styles/createUser.css";
import MultiSelectDropDown from "../common/src/components/MultiSelectDropDown/MultiSelectDropDown";
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

export default function App() {
  const { register, handleSubmit, errors, setValue } = useForm({
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
      {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
      <Input label="Last Name*" name="lastName" register={register} required />
      {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
      <Input label="Email*" register={register} name="email" required />
      {errors.email?.message && <p>{errors.email?.message}</p>}
      <CustomDatePicker
        label="Date of Birth*"
        name="dateOfBirth"
        register={register}
        required
      />
      {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}
      <div className="radio-btn">
        <label>Gender*</label>
        <RadioButton name="gender" value="Male" register={register} required />
        <RadioButton
          name="gender"
          value="Female"
          register={register}
          required
        />
        <RadioButton
          name="gender"
          value="Others"
          register={register}
          required
        />
      </div>
      {errors.gender?.message && <p>{errors.gender?.message}</p>}

      <label>Role*</label>
      <MultiSelectDropDown
        options={["Read", "Write", "Admin", "Super"]}
        name="role"
        setValue={setValue}
        register={register}
      />
      <input type="submit" />
    </form>
  );
}
