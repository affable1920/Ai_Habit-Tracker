import React from "react";
import InputAdd from "../common/InputAdd";

const Step1 = ({ register, errors }) => {
  return (
    <>
      <InputAdd
        name="title"
        label="Habit Title"
        register={register}
        errors={errors}
      />
      <InputAdd
        name="description"
        register={register}
        errors={errors}
        large={true}
      />
    </>
  );
};

export default Step1;
