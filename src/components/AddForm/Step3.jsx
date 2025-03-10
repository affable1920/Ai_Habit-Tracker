import React from "react";
import Select from "../common/Select";
import InputAdd from "../common/InputAdd";

const Step3 = ({ register, errors }) => {
  return (
    <>
      <Select
        name="reminder"
        label="Want a reminder ?"
        register={register}
        errors={errors}
        options={["YES", "NO"]}
        optional
      />
      <InputAdd
        name="reminderTimes"
        label="Times ?"
        register={register}
        errors={errors}
        type="datetime-local"
        optional
      />
    </>
  );
};

export default Step3;
