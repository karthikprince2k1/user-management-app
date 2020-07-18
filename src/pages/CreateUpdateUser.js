import React from "react";
import { useForm } from "react-hook-form";
import Input from "../common/src/components/Input/Input";
import DropDown from "../common/src/components/DropDown/DropDown";

export default function App() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DropDown label="Suffix" ref={register} options={["Mr.", "Mrs."]} />
      <Input label="First Name" register={register} required />
      <Input label="Last Name" register={register} required />
      <Input label="Email" register={register} required />

      <input type="submit" />
    </form>
  );
}
