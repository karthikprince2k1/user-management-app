import React from "react";
import { useForm } from "react-hook-form";
import Input from "../common/src/components/Input/Input";
import DropDown from "../common/src/components/DropDown/DropDown";
import CustomDatePicker from "../common/src/components/CustomDatePicker/CustomDatePicker";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import "../styles/searchUser.css";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  fromDob: yup.date(),
  toDob: yup.date(),
  contactType: yup.string(),
  contact: yup.string().matches(phoneRegExp, "Contact is invalid"),
});

export default function () {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="search-user-form">
      <div className="user-search">
        <Input label="First Name" name="firstName" register={register} />
        {errors.firstName?.message && <p>{errors.firstName?.message}</p>}
        <Input label="Last Name" name="lastName" register={register} />
        {errors.lastName?.message && <p>{errors.lastName?.message}</p>}
        <DropDown
          label="Type"
          name="contactType"
          ref={register}
          options={["Phone", "Fax", "Office", "Mobile"]}
        />
        <Input label="Contact" name="contact" register={register} />
        {errors.contact?.message && <p>{errors.contact?.message}</p>}
      </div>
      <div className="dob-search">
        <CustomDatePicker
          label="Date of Birth"
          name="fromDob"
          register={register}
        />
        {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}
        <CustomDatePicker label="To" name="toDob" register={register} />
        {errors.dateOfBirth?.message && <p>{errors.dateOfBirth?.message}</p>}
      </div>
      <div>
        <input type="submit" value="Search" />
        <button onClick={reset}>Reset</button>
      </div>
    </form>
  );
}
