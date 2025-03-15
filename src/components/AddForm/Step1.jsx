import React from "react";
import InputAdd from "../common/InputAdd";
import { useFormContext } from "react-hook-form";

const Step1 = () => {
  const { register, formState } = useFormContext();

  return (
    <>
      <InputAdd
        name="title"
        label="Habit Title"
        register={register}
        errors={formState.errors}
        large={true}
      />
      <InputAdd
        name="description"
        register={register}
        errors={formState.errors}
        label="Description"
        large={true}
      />
    </>
  );
};

export default Step1;
