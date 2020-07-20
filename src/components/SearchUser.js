import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../common/src/components/Input/Input";
import DropDown from "../common/src/components/DropDown/DropDown";
import CustomDatePicker from "../common/src/components/CustomDatePicker/CustomDatePicker";
import { yupResolver } from "@hookform/resolvers";
import * as yup from "yup";
import "../styles/searchUser.css";

const phoneRegExp = /^$|^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schema = yup.object().shape({
  firstName: yup.string().default(undefined),
  lastName: yup.string().default(undefined),
  contactType: yup.string(),
  contact: yup.string().matches(phoneRegExp, "Contact is invalid"),
});

export default function (props) {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    props.handleSearch && props.handleSearch(data);
  };


  const resetForm = (e) => {
    e.preventDefault();
    reset();
    props.resetSearch && props.resetSearch();

  };
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
        <div className="from-date">
          <CustomDatePicker
            label="Date of Birth"
            name="fromDob"
            register={register}
          />
          {errors.fromDob?.message && <p>{errors.fromDob?.message}</p>}
        </div>
        <div className="to-date">
          <CustomDatePicker
            label="To" name="toDob" register={register}
          />
          {errors.toDob?.message && <p>{errors.toDob?.message}</p>}
        </div>
      </div>
      <div>
        <input type="submit" value="Search" />
        <button onClick={resetForm}>Reset</button>

      </div>
    </form>
  );
}
