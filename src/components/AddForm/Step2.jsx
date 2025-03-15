import React from "react";
import Select from "../common/Select";
import InputAdd from "../common/InputAdd";
import { useFormContext } from "react-hook-form";

const Step2 = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Select
        name="category"
        label="Category"
        register={register}
        errors={errors}
        options={["Fitness", "Productivity", "Health", "Consistency"]}
        optional
      />
      <Select
        name="priority"
        label="Priority"
        register={register}
        errors={errors}
        options={["Low", "Medium", "High", "No Excuse"]}
        optional
      />
      <Select
        name="frequency"
        label="Frequency"
        register={register}
        errors={errors}
        options={["Daily", "Weekly", "Monthly", "Custom"]}
        optional
      />
      <InputAdd
        name="target"
        label="Target"
        register={register}
        errors={errors}
        placeholder="Days to track this habit !"
        type="number"
        optional
      />
    </>
  );
};

export default Step2;
